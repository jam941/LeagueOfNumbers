from django.contrib.auth.models import User, Group
from rest_framework import serializers
from Items.models import *

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class ItemStatsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item_Stats
        fields = '__all__'


