from django.db import models


class ItemCategory(models.Model):
    name = models.CharField(max_length=200, blank=False)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=200, blank=False)
    price = models.IntegerField(blank=False)
    category = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)

    def __str__(self):
        return '{} {}'.format(self.price, self.name)


class Diary(models.Model):
    date = models.DateField(auto_now_add=True, blank=False)
    content = models.CharField(max_length=200, blank=False, default='')


class DiaryItem(models.Model):
    diary = models.ForeignKey(Diary, related_name='diaryItems', on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return '{} {}'.format(self.item.price, self.item.name)
