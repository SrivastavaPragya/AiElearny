from rest_framework.views import APIView
import json
import re
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import Course, Purchase
from .serializers import UserSerializer, CourseSerializer, PurchaseSerializer
import google.generativeai as genai


# ✅ Configure Gemini
genai.configure(api_key="AIzaSyBsmqbTBh3F4AAJtxJ95SK5hScx74qW8Xc")


# 🔐 Signup API
# class SignupView(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate JWT tokens immediately after signup
            refresh = RefreshToken.for_user(user)

            return Response({
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# 🔐 Login API
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            })
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


# 📚 List All Courses (only for logged-in users)
class CourseList(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


# 💳 Purchase a Course
class PurchaseCourse(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        if Purchase.objects.filter(customer=request.user, course=course).exists():
            return Response({"error": "You have already purchased this course."}, status=status.HTTP_400_BAD_REQUEST)

        Purchase.objects.create(customer=request.user, course=course)
        return Response({"message": "Course purchased successfully."})


# 🎓 View My Purchased Courses
class MyPurchases(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        purchases = Purchase.objects.filter(customer=request.user)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)


# 🤖 Gemini LLM-Based Course Suggestion
# class CourseSuggestionView(APIView):
  

#     def post(self, request):
#         user_input = request.data.get('input')
#         if not user_input:
#             return Response({"error": "Input is required"}, status=status.HTTP_400_BAD_REQUEST)

#         all_courses = Course.objects.all()
#         course_titles = [course.title for course in all_courses]
#         course_list_text = ", ".join(course_titles)

#         prompt = (
#             f"You are a helpful assistant. Here are the available courses: {course_list_text}.\n"
#             f"Based on the user's input: '{user_input}', suggest 2-3 relevant course titles."
#         )

#         try:
#             model = genai.GenerativeModel('gemini-1.5-flash')
#             response = model.generate_content(prompt)
#             suggestion_text = response.text.strip()

#             matched_courses = [
#                 course for course in all_courses if any(title.lower() in suggestion_text.lower() for title in [course.title])
#             ]

#             serializer = CourseSerializer(matched_courses, many=True)
#             return Response(serializer.data)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CourseSuggestionView(APIView):
    def post(self, request):
        user_input = request.data.get('input', '').strip()
        if not user_input:
            return Response({"error": "Input is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 🧠 Ask Gemini to classify the intent
            intent_prompt = (
                f"Classify the intent of this user message: '{user_input}'. "
                f"The intent should be one of the following: ['greeting', 'course_query', 'other'].\n"
                f"Return only one word: greeting, course_query, or other."
            )

            model = genai.GenerativeModel('gemini-1.5-flash')
            intent_response = model.generate_content(intent_prompt)
            intent = intent_response.text.strip().lower()

            if intent == "greeting":
                return Response({"message": "Hi! I'm Elearny bot. How may I help you today?"})

            elif intent == "course_query":
                # Fetch all course titles
                all_courses = Course.objects.all()
                course_titles = [course.title for course in all_courses]
                course_list_text = ", ".join(course_titles)

                # Suggest relevant courses
                suggestion_prompt = (
                    f"You are a helpful assistant. Here are the available courses: {course_list_text}.\n"
                    f"Based on the user's input: '{user_input}', suggest 2-3 relevant course titles."
                )

                suggestion_response = model.generate_content(suggestion_prompt)
                suggestion_text = suggestion_response.text.strip()

                matched_courses = [
                    course for course in all_courses if course.title.lower() in suggestion_text.lower()
                ]

                serializer = CourseSerializer(matched_courses, many=True)
                return Response(serializer.data)

            else:
                return Response({"message": "Sorry, this question is beyond my scope. I can only help you with courses."})

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)








#  Quiz Generation Based on Course Topic
# class QuizGeneratorView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         topic = request.data.get('topic')
#         if not topic:
#             return Response({"error": "Topic is required"}, status=status.HTTP_400_BAD_REQUEST)

#         prompt = (
#             f"Create a 5-question multiple choice quiz on the topic: '{topic}'.\n"
#             f"Each question should have 4 options (A, B, C, D), and mention the correct answer clearly after each question."
#         )

#         try:
#             model = genai.GenerativeModel('gemini-1.5-flash')
#             response = model.generate_content(prompt)
#             quiz_text = response.text.strip()

#             return Response({"quiz": quiz_text})

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class QuizGeneratorView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        course_id = request.data.get('id')
        if not course_id:
            return Response({"error": "Course ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Structured JSON Prompt
        prompt = (
            f"Create a 5-question multiple choice quiz on the topic: '{course.title}'.\n"
            f"Return ONLY valid JSON in the format below, and do NOT wrap it in ```json blocks.\n\n"
            f"[\n"
            f"  {{\n"
            f"    \"question\": \"...\",\n"
            f"    \"options\": [\"...\", \"...\", \"...\", \"...\"],\n"
            f"    \"correctAnswerIndex\": 0\n"
            f"  }}\n"
            f"]"
        )

        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            raw_output = response.text.strip()

            # ✅ Remove Markdown wrapping if present
            cleaned_output = re.sub(r"^```json\s*|\s*```$", "", raw_output.strip(), flags=re.IGNORECASE)

            # ✅ Parse the JSON string
            try:
                quiz_json = json.loads(cleaned_output)
            except json.JSONDecodeError:
                return Response({
                    "error": "Failed to parse quiz as JSON",
                    "raw": raw_output,
                    "cleaned": cleaned_output,
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({
                "course": course.title,
                "quiz": quiz_json
            })

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)