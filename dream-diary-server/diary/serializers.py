from rest_framework import serializers
from .models import Diary, DiaryItem, Item


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'


class DiaryItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = DiaryItem
        fields = ('item',)


class DiarySerializer(serializers.ModelSerializer):
    diaryItems = DiaryItemSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Diary
        fields = ('id', 'date', 'content', 'diaryItems')

    def create(self, validated_data):
        diary_items = validated_data.pop('diaryItems')
        diary = Diary.objects.create(**validated_data)
        for diary_item in diary_items:
            DiaryItem.objects.create(diary=diary, **diary_item)
        return diary

    def update(self, instance, validated_data):
        diary_items = validated_data.pop('diaryItems')
        DiaryItem.objects.filter(diary=instance).delete()
        for diary_item in diary_items:
            DiaryItem.objects.create(diary=instance, **diary_item)

        instance.date = validated_data.get('date', instance.date)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
