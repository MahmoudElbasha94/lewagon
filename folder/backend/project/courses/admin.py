from django.contrib import admin
from .models import Student, Instructor, Course, Enrollment, Review, Payment, CourseVideo, Transaction

@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ('user', 'expertise', 'phone_number', 'is_instructor', 'created_at')
    list_filter = ('is_instructor', 'expertise', 'created_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'expertise')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'is_instructor')
        }),
        ('Contact Information', {
            'fields': ('phone_number',)
        }),
        ('Professional Information', {
            'fields': ('expertise', 'bio', 'profile_pic')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'category', 'level', 'price', 'has_valid_instructor')
    list_filter = ('category', 'level', 'courseType', 'created_at')
    search_fields = ('title', 'description', 'instructor__email', 'instructor__first_name', 'instructor__last_name')
    readonly_fields = ('slug', 'created_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'instructor', 'slug')
        }),
        ('Course Details', {
            'fields': ('duration', 'price', 'courseType', 'what_you_will_learn')
        }),
        ('Classification', {
            'fields': ('level', 'category')
        }),
        ('Media', {
            'fields': ('courseImage',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def has_valid_instructor(self, obj):
        return bool(obj.instructor and hasattr(obj.instructor, 'is_instructor') and obj.instructor.is_instructor)
    has_valid_instructor.boolean = True
    has_valid_instructor.short_description = 'Valid Instructor'

admin.site.register(Student)
admin.site.register(Enrollment)
admin.site.register(Review)
admin.site.register(Payment)
admin.site.register(CourseVideo)
admin.site.register(Transaction)
