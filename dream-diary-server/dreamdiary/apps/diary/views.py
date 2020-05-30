from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from .models import Diary
from .serializers import DiarySerializer


@api_view(['GET', 'POST', 'DELETE'])
def diary_list(request):
    if request.method == 'GET':
        diaries = Diary.objects.all()

        date = request.GET.get('date', None)
        if date is not None:
            diaries = diaries.filter(date__icontains=date)

        diaries_serializer = DiarySerializer(diaries, many=True)
        return JsonResponse(diaries_serializer.data, safe=False)
    elif request.method == 'POST':
        diary_data = JSONParser().parse(request)
        diary_serializer = DiarySerializer(data=diary_data)
        if diary_serializer.is_valid():
            diary_serializer.save()
            return JsonResponse(diary_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(diary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def diary_detail(request, pk):
    try:
        diary = Diary.objects.get(pk=pk)
    except Diary.DoesNotExist:
        diary = None

    if request.method == 'GET':
        diary_serializer = DiarySerializer(diary)
        return JsonResponse(diary_serializer.data)
    elif request.method == 'PUT':
        diary_data = JSONParser().parse(request)
        diary_serializer = DiarySerializer(diary, data=diary_data)
        if diary_serializer.is_valid():
            diary_serializer.save()
            return JsonResponse(diary_serializer.data)
        return JsonResponse(diary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if diary is not None:
            diary.delete()
            return JsonResponse({'message': 'Diary successfully removed!'}, status=status.HTTP_204_NO_CONTENT)
        return JsonResponse({'message': 'No Diary found'}, status=status.HTTP_204_NO_CONTENT)