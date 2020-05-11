from django.db import models


class Diary(models.Model):
    id = models.IntegerField(primary_key=True)
    date = models.DateField(auto_now_add=True, blank=False)
    content = models.CharField(max_length=200, blank=False, default='')