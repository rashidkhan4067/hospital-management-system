from django.urls import path
from .views import (
    GlobalExecutiveStatsView, 
    DashboardActivityFeedView, 
    GlobalIntelligenceSearchView, 
    GlobalSearchDiscoveryView,
    DashboardActivityActionView,
    DashboardLensInterpretationView
)

app_name = "dashboard"

urlpatterns = [
    path("intelligence/search/", GlobalIntelligenceSearchView.as_view(), name="global-search"),
    path("intelligence/search/discovery/", GlobalSearchDiscoveryView.as_view(), name="global-search-discovery"),
    path("executive/summary/", GlobalExecutiveStatsView.as_view(), name="executive-summary"),
    path("stats/", GlobalExecutiveStatsView.as_view(), name="executive-stats"),
    path("intelligence/interpret/", DashboardLensInterpretationView.as_view(), name="dashboard-interpret"),
    path("intelligence/interpret", DashboardLensInterpretationView.as_view()), # Slash safeguard
    path("activity/feed/", DashboardActivityFeedView.as_view(), name="activity-feed"),
    path("activity/action/", DashboardActivityActionView.as_view(), name="activity-action"),
]
