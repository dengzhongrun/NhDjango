from django.views.decorators.csrf import csrf_exempt
from django.views.generic import PerformanceView
from django.views import View
from role.models import PerformanceTask

@csrf_exempt
class Performance(PerformanceView):
    template_name = "./per.html"
    model = PerformanceTask
    context_object_name="perfomance"