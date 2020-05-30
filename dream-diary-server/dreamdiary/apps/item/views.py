from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from .models import Item
from .serializers import ItemSerializer


@api_view(['GET', 'POST', 'DELETE'])
def item_list(request):
    if request.method == 'GET':
        items = Item.objects.all()

        name = request.GET.get('name', None)
        if name is not None:
            items = items.filter(name__icontains=name)

        item_serializer = ItemSerializer(items, many=True)
        return JsonResponse(item_serializer.data, safe=False)
    elif request.method.method == 'POST':
        item_data = JSONParser().parse(request)
        item_serializer = ItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse(item_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def item_detail(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        item = None
    
    if request.method == 'GET':
        item_serializer = ItemSerializer(item)
        return JsonResponse(item_serializer.data)
    elif request.method == 'PUT':
        item_data = JSONParser().parse(request)
        item_serializer = ItemSerializer(item, data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse(item_serializer.data)
        return JsonResponse(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if item is not None:
            item.delete()
            return JsonResponse({'message': 'Item successfully removed!'}, status=status.HTTP_204_NO_CONTENT)
        return JsonResponse({'message': 'No Item found'}, status=status.HTTP_204_NO_CONTENT)