from rest_framework import serializers

from api.models import Dish


class DishSerializer(serializers.ModelSerializer):
    """Serializer for dish objects"""
    class Meta():
        model = Dish
        fields = ('id', 'name', 'price')
        read_only_fields = ('id',)
