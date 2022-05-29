from django.db import models

# Create your models here.

LONG_TEXT_FIELD_LENGTH = 1500


class Item(models.Model):
    # TODO Verify database relationships for components, image, gold, tags, stats, and builds
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=LONG_TEXT_FIELD_LENGTH)
    base_price = models.IntegerField()
    sell_price = models.IntegerField()
    buyable = models.BooleanField()

    builds_from = models.ManyToManyField('Item', symmetrical=False, blank=True)
    depth = models.IntegerField()

    img = models.CharField(max_length=LONG_TEXT_FIELD_LENGTH)

    @property
    def total_price(self):
        #if self.depth < 1:
        #   return self.base_price
        #query_set = self.builds_from.all().aggregate(
        #    total_price=models.Sum('total_price')
        #)
        #return query_set('total_price')
        components =  self.builds_from.all()
        if components:
            sum = self.base_price
            for i in components:
                sum += int(i.total_price)
            return sum
        return self.base_price

    def __str__(self):
        return self.name



class Item_Stats(models.Model):

    parent_id = models.IntegerField(primary_key=True)
    Item = models.ForeignKey('Item', on_delete=models.CASCADE)

    Move_Speed = models.FloatField(default=0.0)
    Base_Mana_Regen = models.FloatField(default=0.0)
    Base_Health_Regen = models.FloatField(default=0.0)
    Health = models.FloatField(default=0.0)
    Critical_Strike_Chance = models.FloatField(default=0.0)
    Ability_Power = models.FloatField(default=0.0)
    Mana = models.FloatField(default=0.0)
    Armor = models.FloatField(default=0.0)
    Magic_Resist = models.FloatField(default=0.0)
    Attack_Damage = models.FloatField(default=0.0)
    Attack_Speed = models.FloatField(default=0.0)
    Life_Steal = models.FloatField(default=0.0)
    Ability_Haste = models.FloatField(default=0.0)
    Magic_Penetration = models.FloatField(default=0.0)
    Armor_Penetration = models.FloatField(default=0.0)
    Omnivamp = models.FloatField(default=0.0)
    Heal_and_Shield_Power = models.FloatField(default=0.0)
    Tenacity = models.FloatField(default=0.0)
    Lethality = models.FloatField(default=0.0)
    Gold_Per_10_Seconds = models.FloatField(default=0.0)

class Tag(models.Model):
    id = models.IntegerField(primary_key=True)
    tag = models.CharField(max_length=LONG_TEXT_FIELD_LENGTH)