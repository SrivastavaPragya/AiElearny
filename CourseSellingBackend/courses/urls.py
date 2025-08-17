from django.urls import path
from .views import (
    SignupView,
    LoginView,
    CourseList,
    PurchaseCourse,
    MyPurchases,
    CourseSuggestionView,
    QuizGeneratorView,
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('courses/', CourseList.as_view(), name='course-list'),
    path('courses/<int:course_id>/', PurchaseCourse.as_view(), name='purchase-course'),
    path('my-courses/', MyPurchases.as_view(), name='my-purchases'),
    path('suggest-course/', CourseSuggestionView.as_view(), name='suggest-course'),
      path('generate-quiz/', QuizGeneratorView.as_view(), name='generate-quiz'),
]
