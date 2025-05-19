from django.db import models
from django.utils.text import slugify
from users.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile',null=True, blank=True)
    phone = models.CharField(max_length=15)
    profile_pic = models.ImageField(upload_to='profiles/%Y/%m/%d', null=True, blank=True)

    def __str__(self):
        return self.user.username

class Instructor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    profile_pic = models.ImageField(upload_to='instructors/%Y/%m/%d', null=True, blank=True)
    bio = models.TextField()

    def __str__(self):
        return self.name

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.IntegerField(help_text="Duration in hours")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    courseImage = models.ImageField(upload_to='courses/%Y/%m/%d', null=True, blank=True)
    courseType = models.CharField(max_length=50, choices=[('Free', 'Free'), ('Paid', 'Paid')])
    what_you_will_learn = models.TextField()
    slug = models.SlugField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

class CourseVideo(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='videos')
    title = models.CharField(max_length=255)
    video_url = models.URLField()

    def __str__(self):
        return f"Video: {self.title} ({self.course.title})"

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField()
    progress = models.FloatField(default=0.0)
    status = models.CharField(max_length=20, choices=[('Enrolled', 'Enrolled'), ('Completed', 'Completed')], default='Enrolled')

    def __str__(self):
        return f"{self.student.user.username} enrolled in {self.course.title}"

class Review(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews')
    date = models.DateField()
    rating = models.IntegerField()
    comment = models.TextField()
    
    class Meta:
        unique_together = ['student', 'course']

    def __str__(self):
        return f"{self.student.user.username} reviewed {self.course.title}"

class Payment(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')

    def __str__(self):
        return f"Payment of ${self.price} USD for {self.enrollment.course.title}"
