from datetime import datetime
import json
import os
import pandas as pd
import pymysql
import django
from django.db.models import Q, Count, Sum, Avg
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "NH.settings")
django.setup()
from role.models import *


def show_area1(request):
    try:
        if request.method == "GET":
            dict1 = {}
            area_provinces = Areas.objects.values("provinces").annotate(inputNum=Sum("input_number"))
            for i in list(area_provinces):
                dict1[i["provinces"]] = i["inputNum"]
            return JsonResponse(dict1)
        else:
            return HttpResponse("请求错误")
    except Exception as e:
        return HttpResponse(e.args)

def show_area2(request):
    try:
        if request.method == "GET":
            dict2 = {}
            area_manager = Areas.objects.values("regional_manager").annotate(volume=Sum("volume"),turnover=Sum("turnover"))
            for i in list(area_manager):
                dict2[i["regional_manager"]] = [i["volume"], i["turnover"]]
            return JsonResponse(dict2)
        else:
            return HttpResponse("请求错误")
    except Exception as e:
        return HttpResponse(e.args)

def show_area4(request):
    try:
        if request.method == "GET":
            dict4 = {}
            area_provinces = HouseMainInfo.objects.values("area")
            for i in list(area_provinces):
                if len(dict4) == 0:
                    dict4[i["area"]] = 1
                elif i["area"] in dict4.keys():
                    dict4[i["area"]] += 1
                else:
                    dict4[i["area"]] = 1
            return JsonResponse(dict4)
        else:
            return HttpResponse("请求错误")
    except Exception as e:
        return HttpResponse(e.args)

def show_area3(request):
    try:
        if request.method == "GET":
            obj2 = show_pymysql("001141", "nh", "select * from role_housemaininfo")
            data2 = pd.DataFrame(obj2)
            data2 = data2.rename(columns={0: "id", 1: "姓名", 2: "身份证号码", 3: "性别", 4: "电话号码",
                                          5: "是否常驻", 6: "政治面貌", 7: "个人职业", 8: "健康状况", 9: "婚姻状况",
                                          10: "文化程度", 11: "所属省份", 12: "城市", 13: "农房数量", 14: "农房面积（平方米）",
                                          15: "农房价值（元）", 16: "汽车数量", 17: "农业机械数量", 18: "农用机械价值", 19: "农用机械图片",
                                          20: "劳动人口", 21: "供养人数", 22: "家庭收入（元）", 23: "家庭支出", 24: "企业名称",
                                          25: "生产经营周期（月）", 26: "养殖获奖", 27: "获奖图片", 28: "农业补贴", 29: "建档时间",
                                          30: "可贷款金额", 31: "地区", 32: "区域银行经理", 33: "业务人员编号", 34: "业务人员", })
            data2["建档时间"] = data2["建档时间"].apply(lambda x: str(x.year))
            join_year = data2.groupby(by=['建档时间'])['id'].count()
            join_year = pd.DataFrame(join_year)
            total = len(data2)
            now_data = int(join_year.loc[str(datetime.now().year)])
            join_areas = pd.DataFrame(data2.groupby(by=['所属省份'])['id'].count()).sort_values(['id'], ascending=False)
            header2 = {}
            header2["total"] = total
            header2["now_data"] = now_data
            header2["join_area"] = {}
            header2["join_area"][str(join_areas.iloc[0].name)] = int(join_areas.iloc[0])

            return JsonResponse(header2)
        else:
            return HttpResponse("请求错误")
    except Exception as e:
        return HttpResponse(e.args)


def run_show(request):
    try:
        if request.method == "GET":
            datas = HouseMainInfo.objects.filter(
                                join_time__year=datetime.now().year
                            ).order_by('join_time').values("province", "name", "join_time")
            dict5 = {}
            for i in list(datas):
                dict5[i["province"]] = [i["name"], i["join_time"].strftime("%Y-%m-%d")]
            return JsonResponse(dict5)
        else:
            return HttpResponse("请求错误")
    except Exception as e:
        return HttpResponse(e.args)

def show_area6(request):
    try:
        if request.method == "GET":
            datas = HouseMainInfo.objects.values("province").\
                annotate(avg=Avg("agricultural_subsidies")).\
                order_by('-avg')[:10]
            dict5 = {}
            for i in list(datas):
                dict5[i["province"]] = i["avg"]
            return JsonResponse(dict5)
        else:
            return HttpResponse("请求错误")
    except Exception as e:
        return HttpResponse(e.args)

def show_pymysql(passwd,database,sql):
    # 创建连接
    connect = pymysql.connect(host="127.0.0.1",
                              user="root",
                              passwd=passwd,
                              database=database,
                              port=3307,
                              charset="utf8")
    cursor = connect.cursor()   #创建游标对象

    cursor.execute(sql)
    return cursor.fetchall()
obj1 = show_pymysql("001141", "nh", "select * from role_areas")
obj2 = show_pymysql("001141", "nh", "select * from role_housemaininfo")
obj3 = show_pymysql("001141", "nh", "select id,name from role_personinfo")
data1 = pd.DataFrame(obj1)
data2 = pd.DataFrame(obj2)
data3 = pd.DataFrame(obj3)
data1=data1.rename(columns={0:"id",1:"省份",2:"城市",3:"区域银行经理",4:"业务人员",
                            5:"业务人员编号",6:"成交数量",7:"成交金额",8:"建档数量"})
data2=data2.rename(columns={0:"id",1:"姓名",2:"身份证号码",3:"性别",4:"电话号码",
                            5:"是否常驻",6:"政治面貌",7:"个人职业",8:"健康状况",9:"婚姻状况",
                            10:"文化程度",11:"所属省份",12:"城市",13:"农房数量",14:"农房面积（平方米）",
                            15:"农房价值（元）",16:"汽车数量",17:"农业机械数量",18:"农用机械价值",19:"农用机械图片",
                            20:"劳动人口",21:"供养人数",22:"家庭收入（元）",23:"家庭支出",24:"企业名称",
                            25:"生产经营周期（月）",26:"养殖获奖",27:"获奖图片",28:"农业补贴",29:"建档时间",
                            30:"可贷款金额",31:"地区",32:"区域银行经理",33:"业务人员编号",34:"业务人员",})
