from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib import auth
from django.urls import reverse
from django.contrib.auth import authenticate,login
from django.http import HttpResponseRedirect
from role.models import PersonInfo
from role import models
import hashlib
from io import BytesIO
import io
from PIL import Image
from role.models import *
import time
import locale
import datetime
locale.setlocale(locale.LC_CTYPE, 'Chinese')
now = datetime.datetime.now()
# Create your views here.

@csrf_exempt
# 定义登录函数视图
def login_in(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        if User.objects.filter(username=username):
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request,user)
                    request.session['status']=True
                    request.session['uname']=username
                # 路径是写url后面样式的这里的需要更改
                # 用户权限的判断
                # 超级用户
                    return render(request, "super_index.html")
                    # return redirect(reverse("login_mess"))
            else:
                return render(request,"login_in.html",{"error":"用户名或密码错误"})

        # 客户经理和业务人员的权限判断
        else:
            # 还需要进行判断该用户是不是业务人员或者客户经理
            user_obj = PersonInfo.objects.get(name=username)
            if user_obj.passwd == password:
                use = user_obj.administrator
                # 客户经理
                if use==True:
                    # return redirect(reverse("index"))
                    return render(request, "man_index.html")
                # 业务人员
                else:
                    return render(request, "user_index.html")
                    # return redirect(reverse("performance"))
            else:
                return render(request,"login_in.html",{"error":"用户名或密码错误"})
            # 用户名不存在
            return render(request,"login_in.html",{"error":"密码错误"})
    return render(request,"login_in.html" )

# 短信登录视图
def mes(request):
    if request.method == 'POST':
        phone_number = request.POST.get("phone_number")
        if PersonInfo.objects.filter(phone_number=phone_number):
            user = PersonInfo.objects.get(phone_number=phone_number)
            use = user.administrator
            # 是客户经理
            if use == True:
                # return redirect(reverse("index"))
                return render(request, "man_index.html")
            # 是业务人员
            else:
                # return redirect(reverse("performance"))
                return render(request, "user_index.html")
        else:
            return render(request, "sign_mess.html", {"error": "手机号码错误"})
    else:
        return render(request, "sign_mess.html")

# 登出
# def logout(request):
#     if not request.session.get('is_login', None):  # 如果本来就未登录，也就没有登出一说
#         return redirect("/index/")
#     request.session.flush()  # 将session中的所有内容全部清空
#     return redirect('/index/')


# 绩效发布函数视图
def performance(request):
    if request.method == 'POST':
        # 获取登录人员的信息
        people = PersonInfo.objects.get(name=request.session.get("uname"))
        # people = PersonInfo.objects.get(name="赵占全")

        recept_staff = request.POST.get("recept_staff")
        # pub_staff = request.POST.get("pub_staff")
        pub_time = now.strftime('%Y年%m月%d日'.encode('unicode-escape').decode()).encode().decode('unicode-escape')
        completion_time =request.POST.get("completion_time")
        volume = request.POST.get("volume")
        turnover = request.POST.get("turnover")
        task_description = request.POST.get("task_description")
        performance = PerformanceTask()
        performance.recept_id = people.employee_number
        performance.recept_staff = recept_staff
        performance.pub_time = pub_time
        performance.pub_staff = request.session['uname']
        performance.completion_time = completion_time
        performance.volume = volume
        performance.turnover = turnover
        performance.task_description = task_description
        performance.user_id = people.id_num
        # 保存数据
        performance.save()
        # 保存成功后还是返回发布绩效页面
        return redirect(reverse("performance"))
    return redirect(reverse("login_mess"))


