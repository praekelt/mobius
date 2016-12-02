from django.conf.urls import include,url

from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework import routers
import rest_framework_extras

from mobius.tests.views import MockListView

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
]

