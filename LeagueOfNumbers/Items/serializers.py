from django.contrib.auth.models import User, Group
from rest_framework import serializers
from Items.models import *
class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class Item_StatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item_Stats
        fields = '__all__'

class ConsumableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Consumable
        fields = '__all__'
