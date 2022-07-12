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
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from role import views, show_documentation_area
from role.view import search_view

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('',views.hello),
    path('', TemplateView.as_view(template_name="index.html"), name="home"),
    # path('search/detail', TemplateView.as_view(template_name="nh_detail.html"), name="detail"),
    path('search/detail', search_view.trandi, name="detail"),
    # path('search/', search_view.test, name="search"),
    path('search/', search_view.SearchView.as_view(), name="search"),
    # path('test/', search_view.SearchView.as_view(), name="test"),
    # path('search/<int:page_index>', search_view.SearchView.as_view()),
    # path('area_show/', TemplateView.as_view(template_name="area_show.html"), name="area_show"),
    path('content/', TemplateView.as_view(template_name="content.html"), name="content"),

    path('area_show1/', show_documentation_area.show_area1, name="show1"),
    path('area_show2/', show_documentation_area.show_area2, name="show2"),
    path('area_show3/', show_documentation_area.show_area3, name="show3"),
    path('area_show4/', show_documentation_area.show_area4, name="show4"),
    path('area_show5/', show_documentation_area.run_show, name="show5"),
    path('area_show6/', show_documentation_area.show_area6, name="show6"),

    path('show/', TemplateView.as_view(template_name="area_show.html"), name="area_show"),

]
