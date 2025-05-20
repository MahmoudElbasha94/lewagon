from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('courses/', include('project.courses.urls')),
    path('users/', include('project.users.urls')),
]