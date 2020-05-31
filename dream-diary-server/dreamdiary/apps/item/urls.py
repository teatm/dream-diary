from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^api/items$', views.item_list),
    url(r'^api/items/(?P<pk>[0-9]+)$', views.item_detail),
    url(r'^api/item-categories$', views.item_category_list),
    url(r'^api/item-categories/(?P<pk>[0-9]+)$', views.item_category_detail),
]