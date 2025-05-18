# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display   = ('email', 'first_name', 'last_name', 'is_staff', 'is_student', 'is_instructor')
    ordering       = ('email',)
    search_fields  = ('email',)
    fieldsets      = (
        (None,             {'fields': ('email', 'password')}),
        ('Personal info',  {'fields': ('first_name', 'last_name')}),
        ('Permissions',    {'fields': ('is_staff','is_superuser','is_student','is_instructor','groups','user_permissions')}),
        ('Important dates',{'fields': ('last_login','date_joined')}),
    )
    add_fieldsets  = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','first_name','last_name','password1','password2'),
        }),
    )
