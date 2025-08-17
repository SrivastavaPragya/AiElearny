from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course, Purchase



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    #password is read only so this feild can only be sent as post form the frontend but get request will not return this field

    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        #serializer will only take these fields from the frontend 

    def create(self, validated_data):
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

# Course Serializer
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'



# Purchase Serializer
class PurchaseSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Purchase
        fields = ['id', 'course', 'purchased_at']