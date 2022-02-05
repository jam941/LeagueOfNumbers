from django.db import models

# Create your models here.

class Item(models.Model):
    #TODO Verify database relationships for components, image, gold, tags, stats, and builds
    id = models.IntegerField()
    name = models.CharField()
    colloq = models.CharField()
    plaintext = models.CharField()
    components = models.ManyToManyField()

    #TODO Change this to reference ItemImage Model
    images = models.CharField()
    gold  = models.CharField()
    tags = models.ManyToManyField()
    stats = models.CharField()

    depth = models.IntegerField()
    builds = models.ManyToManyField()