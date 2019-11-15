from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from api.models import Dish
from api.serializers import DishSerializer

DISH_URL = reverse('dish:dish-list')

def sample_dishes():
    Dish.objects.create(name="Schnitzel",price=10.50)
    Dish.objects.create(name="Spaghetti", price=5.99)


class DishApiTests(TestCase):
    """Test the dish api"""

    def setUp(self):
        self.client = APIClient()

    def test_retrieving_dish_list(self):
        """Test for retrieving a list of all dishes"""
        sample_dishes()

        res = self.client.get(DISH_URL)

        dishes = Dish.objects.all()
        serializer = DishSerializer(dishes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_filtering_dishes_by_price_desc(self):
        """Test for filtering dishes by price descending"""
        sample_dishes()

        res = self.client.get(DISH_URL, {'sort': '-price'})

        dishes = Dish.objects.all().order_by('-price')
        serializer = DishSerializer(dishes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)


    def test_filtering_dishes_by_name_desc(self):
        """Test for filtering dishes by name descending"""
        sample_dishes()

        res = self.client.get(DISH_URL, {'sort', '-name'})

        dishes = Dish.objects.all().order_by('-name')
        serializer = DishSerializer(dishes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_filtering_dishes_by_price_asc(self):
        """Test for filtering dishes by price ascending"""
        sample_dishes()

        res = self.client.get(DISH_URL, {'sort', 'price'})

        dishes = Dish.objects.all().order_by('price')
        serializer = DishSerializer(dishes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_filtering_dishes_by_name_asc(self):
        """Test for filtering dishes by name ascending"""
        sample_dishes()

        res = self.client.get(DISH_URL, {'sort': 'name'})

        dishes = Dish.objects.all().order_by('name')
        serializer = DishSerializer(dishes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
        
