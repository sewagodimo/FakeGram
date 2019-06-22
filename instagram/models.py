from django.db import models
from django.contrib.auth.models import AbstractUser, AnonymousUser
from typing import Union


class User(AbstractUser):
    profile_picture = models.ImageField(('users'),
                                        upload_to='frontend/public/users/%Y/%m/%d',
                                        blank=True)
    bio = models.CharField(blank=True, null=True, max_length=250)

    def __str__(self):
        return self.username

    def get_posts(self):
        return Post.objects.filter(user=self).values_list('id', flat=True)

#: Helper type for Django request users: either anonymous or signed-in.
RequestUser = Union[AnonymousUser, User]


class Post(models.Model):
    caption = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(('posts'),
                              upload_to='frontend/public/posts/%Y/%m/%d',
                              blank=True)

    def __str__(self):
        return self.caption

    def get_image_url(self, obj):
        return obj.image.url
