from django.conf.urls import url
from django.views import generic

from mobius import views


app_name = "mobius"
urlpatterns = [
    url(
        r"^$",
        generic.TemplateView.as_view(template_name="mobius/home.html"),
        name="home"
    ),
    url(
        r"^health/$",
        views.health,
        name="health"
    ),
]
