from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin

from api.models import Dish
from api.serializers import DishSerializer

class DishViewSet(GenericViewSet, ListModelMixin):
    """Viewset for dishes"""

    queryset = Dish.objects.all()
    serializer_class = DishSerializer

    def get_queryset(self):
        return self.queryset
