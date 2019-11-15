from django.urls import path, include

from rest_framework.routers import SimpleRouter

from api.views import DishViewSet


router = SimpleRouter()

router.register('dishes', DishViewSet)

app_name='api'

urlpatterns = [
    path('', include(router.urls))
]
