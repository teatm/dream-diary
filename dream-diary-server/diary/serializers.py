from rest_framework import serializers
from .models import Diary


class DiarySerializer(serializers.ModelSerializer):
    diaryItems = serializers.StringRelatedField(required=False, many=True)

    class Meta:
        model = Diary
        fields = ('id', 'date', 'content', 'diaryItems')
