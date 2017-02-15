from django import template

from django.test import TestCase
from django.test.client import RequestFactory


class TemplateTagsTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        super(TemplateTagsTestCase, cls).setUpTestData()
        cls.factory = RequestFactory()

    def test_render_view(self):
        request = self.factory.get("/")
        t = template.Template("""{% load mobius_tags %}
            {% render_view "class-view" %}
            {% render_view "function-view" %}"""
        )
        result = t.render(template.Context({
            "request": request
        }))
        self.assertHTMLEqual("""Class view
            Function view""", result
        )

    def test_render_view_post(self):
        request = self.factory.post("/")
        t = template.Template("""{% load mobius_tags %}
            {% render_view "class-view" %}
            {% render_view "function-view" %}"""
        )
        result = t.render(template.Context({
            "request": request
        }))
        self.assertHTMLEqual("""Class view
            Function view""", result
        )
