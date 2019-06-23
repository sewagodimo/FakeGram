from . import serializers


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': serializers.UserSerializer(user, context={'request': request}).data
    }