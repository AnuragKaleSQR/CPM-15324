# your_app/urls.py

from django.urls import path
from .views import LoginView, LogoutView, RefreshView, ValidateTokenView

urlpatterns = [
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('refresh/', RefreshView.as_view(), name='token_refresh'),
    path('validate/', ValidateTokenView.as_view(), name='token_validate'),
]
