from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(('profiles'),
                                        upload_to='frontend/public/profiles/%Y/%m/%d',
                                        blank=True)
    bio = models.CharField(blank=True, null=True, max_length=250)

    def __str__(self):
        return self.user.username

    def get_posts(self):
        return Post.objects.filter(user=self.user).values_list('id', flat=True)
    def get_user(self):
        return [self.user.id, self.user.username, self.user.email, self.user.first_name, self.user.last_name]

#: Recievers to create, update the profile when the user is created,updated
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

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
