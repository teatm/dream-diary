from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^api/diaries$', views.diary_list),
    url(r'^api/diary/(?P<pk>[0-9]+)$', views.diary_detail),
]