from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework import filters

from api.models import Dish
from api.serializers import DishSerializer

class DishViewSet(GenericViewSet, ListModelMixin):
    """Viewset for dishes"""

    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['name', 'price']
    search_fields = ['name']

    def get_queryset(self):
        return self.queryset
