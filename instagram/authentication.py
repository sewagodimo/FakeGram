from django.conf import settings
from rest_framework import authentication
from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header
from . import models # just import your model here
import jwt

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request): # it will return user object
        try:
            token = get_authorization_header(request).decode('utf-8')
            if token is None or token == "null" or token.strip() == "":
                raise exceptions.AuthenticationFailed('Authorization Header or Token is missing on Request Headers')
            print(token)
            decoded = jwt.decode(token, settings.SECRET_KEY)
            username = decoded['username']
            user_obj = models.User.objects.get(username=username)
        except jwt.ExpiredSignature :
            raise exceptions.AuthenticationFailed('Token Expired, Please Login')
        except jwt.DecodeError :
            raise exceptions.AuthenticationFailed('Token Modified by thirdparty', jwt.DecodeError)
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid Token')
        except Exception as e:
            raise exceptions.AuthenticationFailed(e)
        return (user_obj, None)

    def get_user(self, userid):
        try:
            return models.User.objects.get(pk=userid)
        except Exception as e:
            return None