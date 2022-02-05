from django.db import models

# Create your models here.

class Item(models.Model):
    #TODO Verify database relationships for components, image, gold, tags, stats, and builds
    id = models.IntegerField(primary_key=True)
    name = models.CharField()
    colloq = models.CharField()
    plaintext = models.CharField()
    components = models.ManyToManyField()

    base_price = models.IntegerField()
    sell_price = models.IntegerField()
    buyable = models.BooleanField()

    @property
    def total_price(self):
        return -1


    tags = models.ManyToManyField()


    depth = models.IntegerField()
    builds = models.ManyToManyField()

class Item_Stats(models.model):
    item = models.ForeignKey('Items.Item',on_delete=models.CASCADE)
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

