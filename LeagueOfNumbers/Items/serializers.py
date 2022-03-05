from django.contrib.auth.models import User, Group
from rest_framework import serializers
from Items.models import *


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'base_price', 'sell_price', 'buyable', 'depth', 'builds_from', 'total_price','img','tags']


class ItemStatsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item_Stats
        fields = ['parent_id',
                  'Item',
                  'Move_Speed',
                  'Base_Mana_Regen',
                  'Base_Health_Regen',
                  'Health',
                  'Critical_Strike_Chance',
                  'Ability_Power',
                  'Mana',
                  'Armor',
                  'Magic_Resist',
                  'Attack_Damage',
                  'Attack_Speed',
                  'Life_Steal',
                  'Ability_Haste',
                  'Magic_Penetration',
                  'Armor_Penetration',
                  'Omnivamp',
                  'Heal_and_Shield_Power',
                  'Tenacity',
                  'Lethality',
                  'Gold_Per_10_Seconds', ]

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ['id','tag']
