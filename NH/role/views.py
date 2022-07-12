from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.views import View
from django.views.generic import DetailView, ListView
from django.utils import timezone
# Create your views here.

# def hello(request):
#     # html="<h1>Hello Django BBS</h1>"
#     return render(request,'index.html')


from role.models import Areas, PersonInfo

# 行政区域业务人员信息
class Area_Detile_Peple(ListView):
    paginate_by = 8  # 每页的显示数量
    template_name = 'area_detaile_peple.html'  # 展示内容的web页面
    model = PersonInfo
    context_object_name = 'peple'  # 模板上下文名称

# 行政区域建档数量
class Area_Detail_num(ListView):
    paginate_by = 8
    template_name = 'area_detail_num.html'
    model = Areas
    context_object_name = 'number'

# 行政区域成交量及成交金额
class Area_Detail_mony(ListView):
    paginate_by = 10
    template_name = 'area_detail_mony.html'
    model = Areas
    context_object_name = 'mony'


# 业务人员管理
# 1、业务人员列表
class PsersonInfo_List(ListView):
    paginate_by = 5
    template_name = 'PersonInfo_list.html'
    model = PersonInfo
    context_object_name = 'personinfo_list'


# 2、删除业务人员信息
def delete_person(request):
    if request.method == 'POST':
        staff_id = request.POST.get('staff_id')
        PersonInfo.objects.filter(staff_id=staff_id).delete()

        return redirect(reverse("person_list"))

    return redirect(reverse("personinfo_home"))

# 3、添加业务人员信息
def add_person(request):
    print(request.method)
    if request.method == 'POST':
        name = request.POST.get('name')
        id_num = request.POST.get('id_num')
        area = request.POST.get('area')
        join_time = timezone.now()
        phone_number = request.POST.get('phone')
        email = request.POST.get('email')
        age = request.POST.get('age')
        sex = request.POST.get('sex')
        edu_back = request.POST.get('edu_back')
        administrator = request.POST.get('administrator')
        password = request.POST.get('password')
        boss = request.POST.get('boss')
        Hob_Tal = request.POST.get('Hob_Tal')
        height = request.POST.get('height')
        weight = request.POST.get('weight')
        home_addres = request.POST.get('home_addres')
        person_file = request.POST.get('file')
        user_id = request.POST.get('user_id')

        add_list = PersonInfo(name=name, id_num=id_num, area=area, join_time=join_time, phone_number=phone_number,
                              age=age, sex=sex, edu_back=edu_back, administrator=administrator, password=password,email=email,
                              boss=boss, Hob_Tal=Hob_Tal, height=height, weight=weight, home_address=home_addres,
                              person_file=person_file, user_id=user_id)
        add_list.save()
        return redirect(reverse("person_list"))  # 成功跳转在信息列表页面

    else:
        return redirect(reverse("personinfo_home"))  # 否则返回person主页面





