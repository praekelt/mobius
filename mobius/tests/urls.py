from django.conf.urls import include, patterns, url
from mobius.tests.views import MockListView


urlpatterns = [
    url(r"^modelbase-list/$", MockListView.as_view(), name="modelbase_list"),
    url(r"^", include("project.urls")),
]
