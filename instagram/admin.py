from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from instagram import models


@admin.register(models.User)
class UserAdmin(DjangoUserAdmin):
    """
    Extend the base Django UserAdmin with support for some Fakegram feilds.
    """

    date_hierarchy = 'date_joined'
    ordering = ['-date_joined']
    list_display = list(DjangoUserAdmin.list_display) + ['date_joined']


@admin.register(models.Post)
class PostsAdmin(admin.ModelAdmin):
    """
    Extend the base Model UserAdmin with support for some Fakegram fields.
    """

    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    list_display = ['caption', 'user', 'created_at']
    search_fields = ['caption', 'user__username']
