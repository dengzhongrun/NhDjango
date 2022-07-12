from django.shortcuts import render
from django.http import JsonResponse
from django_pandas.io import read_frame
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")

def chart_list(request):
    """ 数据统计页面 """
    global search_data
    global year_top
    search_data = request.GET.get('q', "")
    year_top=request.GET.get("year","")

    year_data_topic=data_topic()
    year_data=list(year_data_topic.年.unique())
    year_data.sort(reverse=True)
    year_data=[int(i) for i in year_data]



    if len(search_data)==0:
        search_data_all=year_data_topic.loc[(year_data_topic["年"]==year_data[0])]
        search_data=search_data_all.loc[(search_data_all["turnover"]==search_data_all["turnover"].max())]

        search_data=list(search_data["recept_staff"])[0]
        year_top=year_data[0]
    else:
        year_top=int(year_top)

    return render(request, 'chart_list.html',{"year_data":year_data})


ef data_topic():
    data = models.PerformanceTask.objects.all()
    data = read_frame(qs=data)
    data.pub_time = pd.to_datetime(data.pub_time, format="%Y/%m/%d", errors="coerce")
    data["年"]=data["pub_time"].dt.year
    data["月"] = data["pub_time"].dt.month

    return  data


def chart_bar(request):
    """ 构造柱状图的数据 """
    # 数据可以去数据库中获取

    data1 = data_topic()
    month_data1 = {'1月': 0, '2月': 0, '3月': 0, '4月': 0, '5月': 0, '6月': 0, '7月': 0, '8月': 0, '9月': 0, '10月': 0, '11月': 0,
                   '12月': 0}
    month_data2 = {'1月': 0, '2月': 0, '3月': 0, '4月': 0, '5月': 0, '6月': 0, '7月': 0, '8月': 0, '9月': 0, '10月': 0, '11月': 0,
                   '12月': 0}

    max_data_year=data1.loc[data1["年"]==year_top]
    max_data=max_data_year.groupby("recept_staff")[["turnover"]].sum()
    max_data=max_data.reset_index()
    max_name=max_data.loc[max_data["turnover"]==max_data["turnover"].max()]

    max_name=list(max_name["recept_staff"])[0]


    legend = []
    data2 = max_data_year.loc[(max_data_year["recept_staff"] == search_data) ]
    max_db = max_data_year.loc[max_data_year["recept_staff"] == max_name]

    max_db = max_db.groupby("月")[["turnover"]].sum()

    max_db = max_db.reset_index()


    for i in range(1, 13):

        if np.any(max_db["月"] == i):
            # month_data1[str(i) + '月'] = max_db.loc[max_db["月"] == i]["turnover"][0]
            month_data1[str(i) + '月'] = max_db["turnover"][i-1]



    if len(data2)!=0:
        data_db=data2.groupby("月")[["turnover"]].sum()
        data_db=data_db.reset_index()
        for i in range(1, 13):
            if np.any(data_db["月"] == i):
                month_data2[str(i) + '月'] = data_db["turnover"][i-1]

        name = list(data2["recept_staff"])[0]
        max_name = "优秀员工:" + max_name
        legend.append(max_name)
        legend.append(name)
    else:
        max_name = "优秀员工:" + max_name
        name=""
        legend.append(max_name)

    t1 = list(month_data1.values())
    t1 = [int(i) for i in t1]

    t2 = list(month_data2.values())
    t2 = [int(i) for i in t2]

    series_list = [
        {
            "name": max_name,
            "type": 'bar',
            "data": t1
        },
        {
            "name":name,
            "type": 'bar',
            "data": t2
        }
    ]
    x_axis = ['1月', '2月', '3月','4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月']

    result = {
        "status": True,
        "data": {
            'legend': legend,
            'series_list': series_list,
            'x_axis': x_axis,
        }
    }

    return JsonResponse(result)


def chart_pie(request):
    """ 构造饼图的数据 """
    data=data_topic()
    max_data_year = data.loc[data["年"] == year_top]

    max_data = max_data_year.groupby("recept_staff")[["turnover"]].sum()
    max_data = max_data.reset_index()
    max_name = max_data.loc[max_data["turnover"] == max_data["turnover"].max()]
    max_name = list(max_name["recept_staff"])[0]
    max_name_c = max_name


    data_data_year1=max_data_year.loc[max_data_year["recept_staff"]==max_name_c]
    max_data = data_data_year1.groupby("recept_staff")[["volume"]].sum()
    max_data = max_data.reset_index()

    max_d = list(max_data["volume"])[0]
    max_name = "优秀员工:"+list(max_data["recept_staff"])[0]


    data1=max_data_year.loc[max_data_year["recept_staff"]==search_data]
    if len(data1)!=0:

        data1 = data1.groupby("recept_staff")[["volume"]].sum()
        data1=data1.reset_index()


        data1_d = list(data1["volume"])[0]
        data_name = "员工:"+list(data1["recept_staff"])[0]

    else:
        data1_d=0
        data_name="不存在"
    # if len(data1)!=0:
    #
    #     data_name=list(data1["recept_staff"])[0]
    # else:
    #     data1_d=0
    #     data_name=""

    db_data_list = [
        {"value": max_d, "name": max_name},
        {"value": data1_d, "name": data_name},

    ]

    result = {
        "status": True,
        "data": db_data_list
    }
    return JsonResponse(result)


def chart_line(request):
    # year_top = request.GET.get("year", "")
    name_list=[]
    data=data_topic()
    data=data.loc[(data["recept_staff"]==search_data)&(data["年"]==year_top)]
    month_data={'1月':0, '2月':0, '3月':0,'4月':0, '5月':0, '6月':0, '7月':0,'8月':0, '9月':0, '10月':0, '11月':0, '12月':0}
    data_month=data.groupby("月")[["turnover"]].sum()
    data_month=data_month.reset_index()
    for i in range(1,13):
        if np.any(data_month["月"]==i):

            month_data[str(i)+'月']=data_month["turnover"][i-1]
    if len(data)!=0:
        name=list(data["recept_staff"])[0]
        name_list.append(name)
    else:
        name=search_data
        name_list.append(name)
    name_list.append("达标业绩")

    t=list(month_data.values())
    t=[int(i) for i in t]

    series_list = [
        {
            "name": name,
            "type": 'line',

            "data": t
        },
        {
            "name": "达标业绩",
            "type": 'line',

            "data": [10000,20000,30000,10000,60000,70000,10000,20000,30000,40000,60000,70000]
        }

    ]
    title=[]
    title.append(str(year_top)+"绩效图")

    year_list={'text':title,
               "left": "center",
    }
    x_axis = ['1月', '2月','3月','4月', '5月', '6月','7月', '8月', '9月', '10月', '11月','12月']

    result = {
        "status": True,
        "data": {
            'legend': name_list,
            'series_list': series_list,
            'x_axis': x_axis,
        },
        "title": {"text":title}

    }

    return JsonResponse(result)


def highcharts(request):
    """ highcharts示例 """

    return render(request, 'highcharts.html')


from django.forms import ModelForm, Form
from django import forms
