from django.urls import path
from .views import GlobalExecutiveStatsView

app_name = "dashboard"

urlpatterns = [
    path("executive/summary/", GlobalExecutiveStatsView.as_view(), name="executive-summary"),
]
