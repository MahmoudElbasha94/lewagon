from django.contrib import admin
from .models import Student, Instructor, Course, Enrollment, Review, Payment, CourseVideo

admin.site.register(Student)
admin.site.register(Instructor)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Review)
admin.site.register(Payment)
admin.site.register(CourseVideo)
