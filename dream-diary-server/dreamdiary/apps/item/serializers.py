from rest_framework import serializers
from .models import Item, ItemCategory


class ItemCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemCategory
        fields = '__all__'
        # fields = ('id',)
        # extra_kwargs = {
        #     "id": {
        #         "read_only": False,
        #         "required": False,
        #     },
        # }


class ItemSerializer(serializers.ModelSerializer):
    # category = ItemCategorySerializer()

    class Meta:
        model = Item
        fields = '__all__'
        # fields = ('id', 'name', 'category')
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            },
        }