from django.shortcuts import render
from .models import Manu, Car
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
def index(request):
    context = {'manu':Manu.objects.all()}
    return render(request, 'index.html', context)

def cars(request, id):
    cars = Car.objects.filter(manu_id=id)
    context = {'cars':cars, 'id':id}
    return render(request, 'cars.html', context)

def fuel(request, id):
    car = Car.objects.get(id=id)
    tank_in_liters = float(car.tank)
    context = {'car':car, 'id':id, 'res91':(tank_in_liters*2.18).__round__, 'res95':(tank_in_liters*2.33).__round__}
    return render(request, 'fuel.html', context)

@api_view(['GET'])
def getManus(request):
    manus = Manu.objects.all()
    serializer = ManuSerializer(manus, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getManu(request, id):
    manus = Manu.objects.get(id=id)
    serializer = ManuSerializer(manus, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createManu(request):
    serializer = ManuSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET', 'PUT'])
def updateManu(request, id):
    manus = Manu.objects.get(id=id)
    serializer = ManuSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

def deleteManu(request, id):
    manu = Manu.objects.get(id=id)
    manu.delete()
    return Response('deleted')


@api_view(['GET'])
def getCars(request, id):
    cars = Car.objects.filter(manu_id=id)
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOilPrice91(request):
    price = 2.18
    return Response(price)

@api_view(['GET'])
def getOilPrice95(request):
    price = 2.33
    return Response(price)
