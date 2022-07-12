"""NH URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from role import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('',views.hello),

    # 1、行政区域管理主页
    path('area_home', TemplateView.as_view(template_name="man_area.html"), name="area_home"),
    path("area_p", views.Area_Detile_Peple.as_view(),name='area_p'),  # 行政区域业务人员
    path("area_num", views.Area_Detail_num.as_view(),name='area_num'),  # 行政区域建档数量
    path("area_mony", views.Area_Detail_mony.as_view(),name='area_mony'),  # 行政区域成交量及金额

    # 2、业务人员信息管理
    path('personinfo_home', TemplateView.as_view(template_name='personinfo_main.html'), name='personinfo_home'),# 业务人员管理主页面
    path("person_list", views.PsersonInfo_List.as_view(), name='person_list'),# 业务人员信息列表

    path('delete', views.delete_person, name='delete'),# 删除业务人员信息
    path("personinfo_delete", TemplateView.as_view(template_name='delete_personinfo.html'), name='personinfo_delete'),

    path('add', views.add_person, name='add'),# 添加业务人员信息
    path('personinfo_add', TemplateView.as_view(template_name='add_personinfo.html'), name='personinfo_add'), # 视图


]

