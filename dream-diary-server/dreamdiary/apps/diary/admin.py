from django.contrib import admin
from .models import Diary, DiaryItem

admin.site.register(Diary)
admin.site.register(DiaryItem)