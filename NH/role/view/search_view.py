from django.contrib import auth
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.core.paginator import Paginator, PageNotAnInteger, InvalidPage, EmptyPage
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your view here.
from django.urls import reverse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
import json

from django.views.generic import ListView

from role.models import *
from role.utils.pagination import Pagination

class SearchView(View):
    global persons
    # global Name1,IdentityNumber
    def get(self, request):
        return render(request, "search.html")
    def post(self,request):
        Name1 =  request.POST["Name1"]
        IdentityNumber = request.POST["IdentityNumber"]
        Name2 =  request.POST["Name2"]
        Telephone = request.POST["Telephone"]
        Address = request.POST["Address"]
        # content_keywords = request.POST.get('content_key', '')
        post_xx = 0
        if (len(Name1)>0) & (len(IdentityNumber)>0):
            persons = HouseMainInfo.objects.filter(Q(name=Name1) & Q(id_number=IdentityNumber))
            post_xx = 1
        elif (len(Name2)>0) & (len(Telephone)==0) & (len(Address)==0):
            persons = HouseMainInfo.objects.filter(name=Name2)
        elif (len(Name2)==0) & (len(Telephone)>0) & (len(Address)==0):
            persons = HouseMainInfo.objects.filter(phone_number=Telephone)
        elif (len(Name2)==0) & (len(Telephone)==0) & (len(Address)>0):
            persons = HouseMainInfo.objects.filter(province=Address)
        elif (len(Name2)>0) & (len(Telephone)>0) & (len(Address)==0):
            persons = HouseMainInfo.objects.filter(Q(name=Name2) & Q(phone_number=Telephone))
        elif (len(Name2)>0) & (len(Telephone)==0) & (len(Address)>0):
            persons = HouseMainInfo.objects.filter(Q(name=Name2) & Q(province=Address))
        elif (len(Name2)==0) & (len(Telephone)>0) & (len(Address)>0):
            persons = HouseMainInfo.objects.filter(Q(province=Address) & Q(phone_number=Telephone))
        elif (len(Name2)>0) & (len(Telephone)>0) & (len(Address)>0):
            persons = HouseMainInfo.objects.filter(Q(name=Name2) & Q(phone_number=Telephone) & Q(province=Address))
        page_object = Pagination(request, persons)
        return render(request, "search.html",
                      {"search": persons, "status": 1,
                       "post_xx": post_xx,
                       "queryset":page_object.page_queryset,
                       "page_string":page_object.html()})

def trandi(request):
    data = request.GET.get("detail_data")
    datas = HouseMainInfo.objects.filter(id=data).values()
    relation_data = PeopleOfMain.objects.filter(user=int(data)).values()
    dict_data = json.dumps(list(datas)[0],default=str)
    dict_data = dict_data.replace('null', '\"null\"')
    dict_data = json.loads(dict_data)
    if dict_data["is_local"] == False:
        dict_data["is_local"] = "否"
    else:
        dict_data["is_local"] = "是"
    dict_data["responsible"] = list(HouseMainInfo.objects.filter(id=data)
                                    .values("responsible__name"))[0]["responsible__name"]
    return render(request, "nh_detail.html",
                  {"detail_data": datas, "dict_data": dict_data,
                   "relation_data": relation_data, "len_relation": len(relation_data)})




