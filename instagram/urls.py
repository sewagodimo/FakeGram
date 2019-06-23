from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views

urlpatterns = [
	
	path('post/<int:pk>/', views.PostDetail.as_view()),  # api/v1/instagram/1
	path('users/', views.UserList.as_view()),
	path('current_user/', views.current_user),
	path('token-auth/', obtain_jwt_token),
	path('users/<slug:username>/', views.UserDetail.as_view()),
	path('', views.PostList.as_view()),
]