from django.urls import path

from . import views

urlpatterns = [
	path('', views.PostList.as_view()),
	path('post/<int:pk>/', views.PostDetail.as_view()),  # api/v1/instagram/1
	path('users/', views.UserList.as_view()),
	path('<slug:username>/', views.UserDetail.as_view())
]