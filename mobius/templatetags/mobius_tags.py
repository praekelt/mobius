import re

from django import template
from django.http import HttpResponse
from django.utils.encoding import force_text
try:
    from django.urls import resolve, get_script_prefix
except ImportError:
    from django.core.urlresolvers import resolve, get_script_prefix

try:
    # webpack_loader 0.5.0
    from webpack_loader.utils import _get_bundle
except ImportError:
    # webpack_loader 0.3.3
    from webpack_loader.templatetags.webpack_loader import _get_bundle

try:
    # webpack_loader 0.5.0
    from webpack_loader.exceptions import WebpackBundleLookupError
except ImportError:
    # webpack_loader 0.3.3
    # FIXME: jw&phala, @hedley we dont know how to do this cleaner.
    # TODO: this is here for backwards compatibility
    class WebpackBundleLookupError(Exception):
        pass


register = template.Library()


@register.tag
def if_has_bundle(parser, token):
    """Defensive check for bundle existence"""

    bits = token.split_contents()[1:]
    bundle_name = bits[0]
    nodelist = parser.parse(("end_if_has_bundle",))

    token = parser.next_token()
    assert token.contents == "end_if_has_bundle"

    return IfHasBundleNode(nodelist, bundle_name, *bits[1:])


class IfHasBundleNode(template.Node):

    def __init__(self, nodelist, bundle_name, extension=None, config="DEFAULT"):
        self.nodelist = nodelist
        self.bundle_name = template.Variable(bundle_name)
        self.extension = template.Variable(extension)
        self.config = template.Variable(config)

    def __repr__(self):
        return "<IfHasBundleNode>"

    def render(self, context):
        bundle_name = self.bundle_name.resolve(context)
        try:
            extension = self.extension.resolve(context)
        except template.VariableDoesNotExist:
            extension = None
        try:
            config = self.config.resolve(context)
        except template.VariableDoesNotExist:
            config = "DEFAULT"

        try:
            _get_bundle(bundle_name, extension, config)
            return self.nodelist.render(context)
        except (KeyError, WebpackBundleLookupError):
            return ""


@register.tag
def render_view(parser, token):
    """Resolve a view and return the rendered result"""

    result = template.defaulttags.url(parser, token)
    return RenderViewNode(result.view_name, result.args, result.kwargs, result.asvar)


class RenderViewNode(template.defaulttags.URLNode):

    def render(self, context):
        url = super(RenderViewNode, self).render(context)

        # Resolve needs any possible prefix removed
        url = re.sub(r"^%s" % get_script_prefix().rstrip("/"), "", url)
        view, args, kwargs = resolve(url)

        # Call the view. Let any error propagate.
        context.push()
        # Context push does not make a deepcopy of the request, so handle the
        # method manually.
        request = context["request"]
        method = request.method
        request.method = "GET"
        result = view(request, *args, **kwargs)
        if isinstance(result, template.response.TemplateResponse):
            # The result of a class based view
            html = result.render().rendered_content
        elif isinstance(result, HttpResponse):
            # Old-school view
            html = result.content
        context.pop()
        request.method = method

        return force_text(html)
