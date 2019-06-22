from . import models

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

	get_posts = serializers.ReadOnlyField()
	class Meta:
		model = models.User
		fields = ('id', 'username','profile_picture', 'first_name','last_name','bio', 'get_posts')
	

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
