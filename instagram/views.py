from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect

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

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = serializers.UserSerializer(request.user)
    return Response(serializer.data)