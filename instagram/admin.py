from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from instagram import models


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
    """
    Extend the base Django UserAdmin with support for some Buza fields.
    """

    date_hierarchy = 'user__date_joined'
    ordering = ['-user__date_joined']
    # list_display =  ['user', 'user__date_joined', 'user__username']


@admin.register(models.Post)
class PostsAdmin(admin.ModelAdmin):
    """
    Extend the base Django UserAdmin with support for some Buza fields.
    """

    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    list_display = ['caption', 'user', 'created_at']
    search_fields = ['caption', 'user']
