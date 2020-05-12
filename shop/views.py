from django.shortcuts import render,redirect
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.response import Response
from .models import User,Item,Address,Address1,Rating
from .serializers import UserSerializer, ItemSerializer, AddressSerializer,RatingSerializer
from rest_framework import status,serializers
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework import generics
import stripe
from rest_framework.decorators import api_view
import json
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
from paypalcheckoutsdk.orders import OrdersCreateRequest
from paypalhttp import HttpError
from paypalcheckoutsdk.orders import OrdersCaptureRequest
stripe.api_key = "sk_test_9kDoV63WPpCjIGQqE95cfgql00L7UU3Wd8"
class UserViewSet(viewsets.ModelViewSet):
    serializer_class=UserSerializer
    queryset = User.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['=username']

    def get_queryset(self):
        queryset = User.objects.all()
        username = self.request.query_params.get('username',None)
        if username is not None:
            queryset = queryset.filter(purchaser__username=username)
        return queryset
    
class ItemViewSet(viewsets.ViewSet):
    def list(self, request,*args,**kwargs):
        title= self.request.query_params.get('title',None)
        label= self.request.query_params.get('label',None)
        items= Item.objects.filter(label=label)
        queryset = Item.objects.all()
        # serializer = ItemSerializer(queryset,many=True)
        serializer = ItemSerializer(items,many=True)
        return Response(serializer.data)

class AddressViewSet(APIView):
    """
    List all snippets, or create a new snippet.
    """
    
    def get(self, request, format=None):
        address = Address.objects.all()
        serializer = AddressSerializer(address, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @classmethod
    def get_extra_actions(cls):
        return []    

# class RatingViewSet(APIView):
#     def get(self,request,format=None):
#         ratings=Rating.objects.all()
#         serializer = RatingSerializer(ratings,many=True)
#         return Response(serializer.data)
    
#     # def post(self, request, format=None):
#     #     serializer = RatingSerializer(data=request.data)
#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     @classmethod
#     def get_extra_actions(cls):
#         return []  
class RatingViewSet(viewsets.ModelViewSet):
    serializer_class=RatingSerializer
    queryset = Rating.objects.all()
    # def get_queryset(self):
    #     queryset = Rating.objects.all()
    #     return queryset
class ItemListView(generics.ListAPIView):
    serializer_class=ItemSerializer
    queryset = Item.objects.all() 

@api_view(['POST'])
def charge(request):
    
    # amount=5
    if request.method == 'POST':
    #     print("DADSDDSAADSDS")
        print('DAta:',request.data),
        print('DAta:',request.POST),
        req= request.data['obj']
        data= json.loads(request.data['obj'])
        # obj= y["obj"]
        
        print("to jest email", data['email'])
        print("to jest nickname", data['nickname'])

        customer = stripe.Customer.create(
             email=data['email'],
             name=data['nickname'],
             source=data['token']
        )
        charge = stripe.Charge.create(
            customer=customer,
            amount=500,
            currency='usd',
            description="Donation"
    )
    return Response({'received data': request.data})
    #return redirect(reverse('success',args=[amount]))
    #return Response({"message": "Hello, world!"})
@api_view()
def successMsg(request,args):
    amount = args
    print("DAta gotowe dane")
    return Response({"message": "Hello, world!"})
    # return render(request,'success.html',{'amount': amount})

# Paypal v2

# Creating Access Token for Sandbox
client_id = "AfrF1xYvenpQapBRsuaA32OTCpze6gpkxBROvazOVdyDr1rCRDJaGWnpwI61k70gf1fz5cqOM99ivYOm"
client_secret = "EKxpmctDj0gC5CFwg0UdZffhsHvv0fguCq7JRSUB0Ed0vzO05lTRNl4qn9lGWSxgbio2hvtcYODvU6kd"
# Creating an environment
environment = SandboxEnvironment(client_id=client_id, client_secret=client_secret)
client = PayPalHttpClient(environment)
@api_view(['POST'])
def paypal(request):
    request = OrdersCreateRequest()

    request.prefer('return=representation')
    request.request_body (
    {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": "100.00"
                }
            }
        ]
    }
    )
    # Call API with your client and get a response for your call
    response = client.execute(request)
    print ('Order With Complete Payload:')
    print ('Status Code:', response.status_code)
    print ('Status:', response.result.status)
    print ('Order ID:', response.result.id)
    print ('Intent:', response.result.intent)
    print ('Links:')
    for link in response.result.links:
        print('\t{}: {}\tCall Type: {}'.format(link.rel, link.href, link.method))
        # print 'Total Amount: {} {}'.format(response.result.purchase_units[0].amount.currency_code,
        # response.result.purchase_units[0].amount.value)
        # If call returns body in response, you can get the deserialized version from the result attribute of the response
        order = response.result
        print (order)
    
    return Response({"message": "Hello, world!"})
@api_view()   
def paypalcapture(request):
    request = OrdersCaptureRequest("8DX65557KK637174R")

    try:
    # Call API with your client and get a response for your call
        response = client.execute(request)

    # If call returns body in response, you can get the deserialized version from the result attribute of the response
        order = response.result.id
    except IOError as ioe:
        if isinstance(ioe, HttpError):
            # Something went wrong server-side
            print(ioe.status_code)
            print(ioe.headers)
	        
        else:
            # Something went wrong client side
            print(ioe)
    return Response({"message": "Hello, world!"})

