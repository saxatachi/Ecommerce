from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.shortcuts import reverse
from django_countries.fields import CountryField
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator,MaxValueValidator
from oscar.apps.catalogue.abstract_models import AbstractProduct
from django.utils.translation import gettext_lazy as _


# class DefaultRecommendProducts(AbstractProduct):
#     product = models.ForeignKey('catalogue.Product',on_delete=models.CASCADE, related_name='%(class)s_requests_created',verbose_name=_("Product"))
from oscar.apps.catalogue.abstract_models import AbstractProduct,AbstractProductClass

class Product(AbstractProduct):
    video_url = models.URLField()
    # product0 = models.URLField(default="127.0.0.1/item/33")
    # product1 = models.URLField(default="127.0.0.1/item/33")
    # product2 = models.URLField(default="127.0.0.1/item/33")
    # product3 = models.URLField(default="127.0.0.1/item/33")
    

class DefaultRecommendation(models.Model):
    product = models.ForeignKey('catalogue.Product',on_delete=models.CASCADE, related_name='%(class)s_requests_created1',verbose_name=_("Product1"))
    





from oscar.apps.catalogue.models import *
CATEGORY_CHOICES = (
    ('S', 'Shirt'),
    ('SW', 'Sport wear'),
    ('OW', 'Outwear')
)

LABEL_CHOICES = (
    ('P', 'primary'),
    ('S', 'secondary'),
    ('D', 'danger')
)

ADDRESS_CHOICES = (
    ('B', 'Billing'),
    ('S', 'Shipping'),
)


class User(AbstractUser):
    
    def __str__(self):
        return self.username


class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    label = models.CharField(choices=LABEL_CHOICES, max_length=1)
    slug = models.SlugField()
    description = models.TextField()
    image = models.ImageField()
    def no_of_ratings(self):
        ratings = Rating.objects.filter(title=self)
        return len(ratings)
    def avg_rating(self):
        sum=0
        ratings = Rating.objects.filter(title=self)
        for rating in ratings:
            sum+= rating.stars
        if len(ratings)>0:    
            return sum/ len(ratings)    
        else: 
            return 0
    
    def __str__(self):
        return self.title

class OrderItem(models.Model):
    username = models.ForeignKey(User,on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

class Order(models.Model):
    username = models.ForeignKey(User,on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    shipping_address = models.ForeignKey(
        'Address', related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
    billing_address = models.ForeignKey(
        'Address', related_name='billing_address', on_delete=models.SET_NULL, blank=True, null=True)
    being_delivered = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
    refund_requested = models.BooleanField(default=False)
    refund_granted = models.BooleanField(default=False)


class Address(models.Model):
    username = models.OneToOneField(User,related_name='address',on_delete=models.CASCADE)
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100)
    country = CountryField(multiple=False)
    address_type = models.CharField(max_length=1, choices=ADDRESS_CHOICES)
    default = models.BooleanField(default=False)
    class Meta:
        verbose_name_plural = 'Addresses'

    def __str__(self):
        return '%s %s %s %s' % (self.street_address, self.apartment_address, self.country, self.address_type)
class Address1(models.Model):
    user = models.CharField(max_length=100)
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100)
    country = CountryField(multiple=False)
    address_type = models.CharField(max_length=1, choices=ADDRESS_CHOICES)
    default = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = 'Addresses1'

# class Rating(models.Model):
#     product = models.ForeignKey('catalogue.Product',on_delete=models.CASCADE, related_name='prod',verbose_name=_("Product2"))
#     username= models.OneToOneField(User,related_name='ratings',on_delete=models.CASCADE)
#     stars=models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
#     class Meta:
#         verbose_name_plural = 'Ratings'
    
#     def __str__(self):
#         return self.title
from oscar.apps.catalogue.models import *