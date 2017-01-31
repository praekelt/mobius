from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework import routers
import rest_framework_extras

from mobius.tests.views import MockListView, ClassView, function_view


router = routers.DefaultRouter()

rest_framework_extras.discover(router)
rest_framework_extras.register(router)

admin.autodiscover()

urlpatterns = [
    url(r"^", include("mobius.urls", namespace="mobius")),
    url(r"^api/(?P<version>(v1))/", include(router.urls)),
    url(r"^admin/", include(admin.site.urls)),
    url(
        r"^api-auth/",
        include("rest_framework.urls", namespace="rest_framework")
    ),
    url(r"^api-auth/$", obtain_jwt_token, name="obtain_token"),
    url(r"^radmin/", include("radmin.urls")),
    url(r"^modelbase-list/$", MockListView.as_view(), name="modelbase_list"),
    url(
        r"^class-view/$",
        ClassView.as_view(),
        name="class-view"
    ),
    url(r"^function-view/$", function_view, name="function-view"),

]

