from rest_framework import serializers
from .models import Diary, DiaryItem
from dreamdiary.apps.item.models import Item, ItemCategory
from dreamdiary.apps.item.serializers import ItemSerializer, ItemCategorySerializer


class DiaryItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = DiaryItem
        fields = ('item', 'price')
        # fields = '__all__'


class DiarySerializer(serializers.ModelSerializer):
    diaryItems = DiaryItemSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Diary
        fields = ('id', 'date', 'content', 'diaryItems')

    def create(self, validated_data):
        diary_items = validated_data.pop('diaryItems')
        diary = Diary.objects.create(**validated_data)

        for diary_item in diary_items:
            item = Item.objects.get(pk=diary_item['item']['id'])
            DiaryItem.objects.create(diary=diary, item=item, price=diary_item['price'])

        return diary

    def update(self, instance, validated_data):
        diary_items = validated_data.pop('diaryItems')
        DiaryItem.objects.filter(diary=instance).delete()

        for diary_item in diary_items:
            item = Item.objects.get(pk=diary_item['item']['id'])
            DiaryItem.objects.create(diary=instance, item=item, price=diary_item['price'])

        instance.date = validated_data.get('date', instance.date)
        instance.content = validated_data.get('content', instance.content)
        instance.save()

        return instance
