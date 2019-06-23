from . import models

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

	get_posts = serializers.ReadOnlyField()
	class Meta:
		model = models.User
		fields = ('id', 'username','profile_picture', 'first_name','last_name','bio', 'get_posts')
	

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
		model = models.User
		fields = ('token', 'username', 'password')


class PostUserSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.User
		fields = ('id', 'username','profile_picture')
	


class PostSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Post
		fields = ('id', 'caption', 'created_at', 'image','user')

	def to_representation(self, instance):
		data = super().to_representation(instance)
		data['user'] = PostUserSerializer(models.User.objects.get(pk=data['user'])).data
		return data


class UserPostsSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Post
		fields = ('id',)
