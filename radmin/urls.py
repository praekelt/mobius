from django.conf.urls import url

from radmin import views

urlpatterns = [
    url(r'^', views.index, name='index'),
]