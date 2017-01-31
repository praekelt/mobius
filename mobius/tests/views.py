from django.http import HttpResponse
from django.views.generic import TemplateView

from rest_framework import generics
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from jmbo.models import ModelBase


class ModelBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ModelBase
        fields = ("title",)


class MockListView(generics.ListAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelBaseSerializer

    model = ModelBase

    def get_queryset(self, request):
        queryset = ModelBase.permitted.get_queryset(request.user)
        return queryset

    def list(self, request):
        queryset = self.get_queryset(request)
        serializer = ModelBaseSerializer(queryset, many=True)
        return Response(serializer.data)


class ClassView(TemplateView):
    template_name = "tests/class_view.html"


def function_view(request):
    return HttpResponse("Function view")
