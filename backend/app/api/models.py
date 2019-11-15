from django.db import models


class Dish(models.Model):
    """Dish model"""
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
