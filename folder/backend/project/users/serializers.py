from rest_framework import serializers
from .models import User
from courses.models import Instructor, Student
import re

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    is_student = serializers.BooleanField(default=True)
    is_instructor = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name',
            'password', 'confirm_password', 'profile_picture',
            'is_student', 'is_instructor'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[^A-Za-z0-9]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        if data.get('is_student') and data.get('is_instructor'):
            raise serializers.ValidationError("A user cannot be both a student and a lecturer at the same time.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'is_student', 'is_instructor', 'profile_picture']
        read_only_fields = ['is_student', 'is_instructor']

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[^A-Za-z0-9]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    def validate(self, data):
        user = self.context['request'].user
        if not user.check_password(data['current_password']):
            raise serializers.ValidationError({'current_password': 'Current password is incorrect.'})
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'New passwords do not match.'})
        if data['current_password'] == data['new_password']:
            raise serializers.ValidationError({'new_password': 'New password must be different from the current password.'})
        self.validate_new_password(data['new_password'])
        return data

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'profile_picture']

class InstructorProfileSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Instructor
        fields = [
            'id', 'user', 'phone_number', 'bio',
            'expertise', 'profile_pic'
        ]

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = [
            'id', 'user', 'phone', 'profile_pic'
        ]
        read_only_fields = ['id', 'user']

class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name', 'email', 'phone',
            'role', 'profile_picture'
        ]


