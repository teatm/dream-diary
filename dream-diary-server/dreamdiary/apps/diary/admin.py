from .models import Diary, ItemCategory, DiaryItem, Item
from django.contrib import admin

admin.site.register(Diary)
admin.site.register(ItemCategory)
admin.site.register(Item)
admin.site.register(DiaryItem)