from rest_framework import generics

from . import models, serializers


class PostList(generics.ListCreateAPIView):
	queryset = models.Post.objects.all()
	serializer_class = serializers.PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = models.Post.objects.all()
	serializer_class = serializers.PostSerializer


class UserList(generics.ListCreateAPIView):
	queryset = models.User.objects.all()
	serializer_class = serializers.UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = models.User.objects.all()
	lookup_field = 'username'
	serializer_class = serializers.UserSerializer
