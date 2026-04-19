from django.urls import path
from .views import GlobalExecutiveStatsView, DashboardActivityFeedView, GlobalIntelligenceSearchView

app_name = "dashboard"

urlpatterns = [
    path("intelligence/search/", GlobalIntelligenceSearchView.as_view(), name="global-search"),
    path("executive/summary/", GlobalExecutiveStatsView.as_view(), name="executive-summary"),
    path("stats/", GlobalExecutiveStatsView.as_view(), name="executive-stats"),
    path("activity/feed/", DashboardActivityFeedView.as_view(), name="activity-feed"),
]
