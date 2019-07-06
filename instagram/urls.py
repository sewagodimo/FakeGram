from django.urls import path, include

from . import views

urlpatterns = [
	# post urls
	path('', views.PostListView.as_view()),
	path('posts/', views.PostListView.as_view()),
	path('posts/create/', views.PostCreateView.as_view()),
	path('posts/<int:pk>/', views.PostDetailView.as_view()),  # api/v1/instagram/1
	path('posts/<int:pk>/edit/', views.PostUpdateView.as_view()),
	
	# user urls
	path('users/', views.UserListView.as_view()),
	path('users/<slug:username>/', views.UserDetailView.as_view()),
	path('users/<slug:username>/edit/', views.UserUpdateView.as_view()),

	# auth urls
	path('auth/register/', views.UserCreateView.as_view()),
	path('auth/login/', views.LoginAPIView.as_view()),
	path('auth/', include('knox.urls')),
	path('current_user/', views.current_user),
]

"""
curl --request POST \
--url http://localhost:8000/api/v1/instagram/auth/login/ \
--header 'content-type: application/json' \
--data '{
  "username": "api_user",
  "password": "1111"
}'
"""