from django.contrib.auth.models import User, Group
from rest_framework import serializers
from Items.models import *

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ['id','name','base_price','sell_price','buyable','depth','builds_from','total_price']

class ItemStatsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item_Stats
        fields = '__all__'

