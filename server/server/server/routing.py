from django.urls import path

from .consumers import GetCryptoCoinRate

urlsPatterns =[
    path('ws/crypto',GetCryptoCoinRate.as_asgi())
]