from django.db import models

# Create your models here.

LONG_TEXT_FIELD_LENGTH = 256


class Item(models.Model):
    # TODO Verify database relationships for components, image, gold, tags, stats, and builds
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=LONG_TEXT_FIELD_LENGTH)
    base_price = models.IntegerField()
    sell_price = models.IntegerField()
    buyable = models.BooleanField()

    builds_from = models.ManyToManyField('Item', symmetrical=False, blank=True)
    depth = models.IntegerField()

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
    Item = models.ForeignKey('Item', on_delete=models.CASCADE)
    armor = models.IntegerField(default=0)
    magic_resist = models.IntegerField(default=0)
    hp = models.IntegerField(default=0)
    hp_regen = models.IntegerField(default=0)
    mana = models.IntegerField(default=0)
    mana_regen = models.IntegerField(default=0)
    lethality = models.IntegerField(default=0)
    armor_pen = models.IntegerField(default=0)
    attack_damage = models.IntegerField(default=0)
    ability_power = models.IntegerField(default=0)
    crit_chance = models.FloatField(default=0)
    attack_speed = models.FloatField(default=0)
    tenacity = models.FloatField(default=0)
    magic_pen = models.FloatField(default=0)
    ability_haste = models.IntegerField(default=0)
    summoner_haste = models.IntegerField(default=0)
    item_haste = models.IntegerField(default=0)
    movement_speed = models.IntegerField(default=0)
    active = models.BooleanField(default=False)
    passive = models.BooleanField(default=False)
