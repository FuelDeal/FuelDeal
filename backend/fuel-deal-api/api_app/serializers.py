from rest_framework.serializers import ModelSerializer
from .models import *

class ManuSerializer(ModelSerializer):
    class Meta:
        model = Manu
        fields = '__all__'
class CarSerializer(ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'