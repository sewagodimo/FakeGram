from . import models

from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class ProfileUserSerizalier(serializers.ModelSerializer):
	class Meta:
    	model = User
		fields = ('username')


class UserSerializer(serializers.ModelSerializer):

	get_posts = serializers.ReadOnlyField()
	get_user = serializers.ReadOnlyField()
	class Meta:
		model = models.Profile
		fields = ('user','profile_picture', 'bio', 'get_posts')
	
	def to_representation(self, instance):
		data = super().to_representation(instance)
		print("ANd",data)
		data['user'] = ProfileUserSerizalier(User.objects.get(pk=data['user'])).data
		return data
	

class UserSerializerWithToken(serializers.ModelSerializer):
    	
	token = serializers.SerializerMethodField()
	password = serializers.CharField(write_only=True)

	def get_token(self, obj):
		jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

		payload = jwt_payload_handler(obj)
		token = jwt_encode_handler(payload)
		return token

	def create(self, validated_data):
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
				instance.set_password(password)
		instance.save()
		return instance

	class Meta:
		model = User
		fields = ('token', 'username', 'password')


class PostUserSerializer(serializers.ModelSerializer):
	get_user = serializers.ReadOnlyField()

	class Meta:
		model = models.Profile
		fields = ('get_user','profile_picture')
	


class PostSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Post
		fields = ('id', 'caption', 'created_at', 'image','user')

	def to_representation(self, instance):
		data = super().to_representation(instance)
		data['user'] = PostUserSerializer(User.objects.get(pk=data['user'])).data
		return data


class UserPostsSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Post
		fields = ('id',)
