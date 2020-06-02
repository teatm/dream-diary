from django.db.models import Q
from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from .models import Item, ItemCategory
from .serializers import ItemSerializer, ItemCategorySerializer


@api_view(['GET', 'POST', 'DELETE'])
def item_list(request):
    if request.method == 'GET':
        items = Item.objects.all()
        item_categories = ItemCategory.objects.all()

        name = request.GET.get('name', None)
        if name is not None:
            items = items.filter(Q(name__icontains=name) | Q(category__name__icontains=name))

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


@api_view(['GET', 'POST', 'DELETE'])
def item_category_list(request):
    if request.method == 'GET':
        itemCategories = ItemCategory.objects.all()

        item_category_serializer = ItemCategorySerializer(itemCategories, many=True)
        return JsonResponse(item_category_serializer.data, safe=False)
    elif request.method == 'POST':
        item_category_data = JSONParser().parse(request)
        item_category_serializer = ItemCategorySerializer(data=item_category_data)
        if item_category_serializer.is_valid():
            item_category_serializer.save()
            return JsonResponse(item_category_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(item_category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def item_category_detail(request, pk):
    try:
        itemCategory = ItemCategory.objects.get(pk=pk)
    except ItemCategory.DoesNotExist:
        itemCategory = None

    if request.method == 'GET':
        item_category_serializer = ItemCategorySerializer(itemCategory)
        return JsonResponse(item_category_serializer.data)
    elif request.method == 'PUT':
        item_category_data = JSONParser().parse(request)
        item_category_serializer = ItemCategorySerializer(itemCategory, data=item_category_data)
        if item_category_serializer.is_valid():
            item_category_serializer.save()
            return JsonResponse(item_category_serializer.data)
        return JsonResponse(item_category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if itemCategory is not None:
            itemCategory.delete()
            return JsonResponse({'message': 'Item category successfully removed!'}, status=status.HTTP_204_NO_CONTENT)
        return JsonResponse({'message': 'No Item category found'}, status=status.HTTP_204_NO_CONTENT)