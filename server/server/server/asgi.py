

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from .routing import urlsPatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')


application =  ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':AllowedHostsOriginValidator(AuthMiddlewareStack(
        URLRouter(
urlsPatterns
        )
    ))
})