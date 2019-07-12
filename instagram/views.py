from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from knox.models import AuthToken
from . import models, serializers
from rest_framework.response import Response


class PostListView(generics.ListAPIView):
	queryset = models.Post.objects.all().order_by('-created_at', '-updated_at')
	serializer_class = serializers.PostSerializer


class PostDetailView(generics.RetrieveAPIView):
	queryset = models.Post.objects.all()
	serializer_class = serializers.PostSerializer

class PostCreateView(generics.ListCreateAPIView):
	permission_classes = (IsAuthenticated,)
	queryset = models.Post.objects.all().order_by('-created_at', '-updated_at')
	serializer_class = serializers.PostSerializer
  

class PostUpdateView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer


class UserListView(generics.ListAPIView):
	queryset = models.User.objects.all()
	serializer_class = serializers.UserSerializer

class UserDetailView(generics.RetrieveAPIView):
	queryset = models.User.objects.all()
	lookup_field = 'username'
	serializer_class = serializers.UserSerializer


class UserUpdateView(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = (IsAuthenticated,)
	queryset = models.User.objects.all()
	lookup_field = 'username'
	serializer_class = serializers.UserSerializer 


class UserCreateView(generics.GenericAPIView):
    serializer_class = serializers.CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": serializers.UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class LoginAPIView(generics.GenericAPIView):
    serializer_class = serializers.LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        print("user", user)
        print("user data", serializers.UserSerializer(user, context=self.get_serializer_context()).data)
        return Response({
            'user': serializers.UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    permission_classes = (IsAuthenticated,)
    serializer = serializers.UserSerializer(request.user)
    return Response(serializer.data)
