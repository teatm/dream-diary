from django.db import models

class ItemCategory(models.Model):
    name = models.CharField(max_length=200, blank=False)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=200, blank=False)
    category = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name