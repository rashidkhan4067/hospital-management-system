from django.urls import path
from .views import GlobalExecutiveStatsView, DashboardActivityFeedView

app_name = "dashboard"

urlpatterns = [
    path("executive/summary/", GlobalExecutiveStatsView.as_view(), name="executive-summary"),
    path("activity/feed/", DashboardActivityFeedView.as_view(), name="activity-feed"),
]
