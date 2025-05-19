# دليل تكامل Django مع Frontend

## مقدمة
هذا الدليل يوضح كيفية تحويل التطبيق من React إلى Django مع الحفاظ على نفس الوظائف. سنقوم بتغطية جميع النقاط الرئيسية والتحويلات المطلوبة.

## 1. هيكل المشروع
### 1.1 هيكل المجلدات
```
project/
├── backend/                 # مجلد Django
│   ├── manage.py
│   ├── requirements.txt
│   ├── core/               # المشروع الرئيسي
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── apps/              # تطبيقات Django
│       ├── accounts/      # إدارة المستخدمين
│       ├── courses/       # إدارة الدورات
│       ├── payments/      # إدارة المدفوعات
│       └── notifications/ # إدارة الإشعارات
└── frontend/              # مجلد React (الموجود حالياً)
```

## 2. التحويل من React إلى Django

### 2.1 المكونات (Components)
#### 2.1.1 المكونات العامة
```typescript
// src/components/common/Button.tsx
// TODO: في Django، سيتم استخدام:
// 1. Django Template Tags بدلاً من المكونات
// 2. Django Forms بدلاً من التحكم في النماذج
// 3. Django Widgets بدلاً من المكونات المخصصة
// 4. Django Form Media بدلاً من CSS المخصص
// 5. Django Template Language بدلاً من JSX
```

#### 2.1.2 مكونات التوجيه
```typescript
// src/components/routing/ProtectedRoute.tsx
// TODO: في Django، سيتم استخدام:
// 1. Django Authentication Middleware بدلاً من ProtectedRoute
// 2. Django Login Required Decorator بدلاً من التحقق من المصادقة
// 3. Django Permission Classes بدلاً من التحقق من الصلاحيات
// 4. Django Session Middleware بدلاً من إدارة الجلسات
// 5. Django Authentication Backends بدلاً من نظام المصادقة المخصص
```

### 2.2 الصفحات (Pages)
#### 2.2.1 صفحة تسجيل الدخول
```typescript
// src/pages/LoginPage.tsx
// TODO: في Django، سيتم استخدام:
// 1. Django Authentication Views بدلاً من صفحة تسجيل الدخول
// 2. Django Forms بدلاً من التحكم في النماذج
// 3. Django Messages Framework بدلاً من إدارة الأخطاء
// 4. Django Social Authentication بدلاً من تسجيل الدخول الاجتماعي
// 5. Django Password Reset Views بدلاً من إعادة تعيين كلمة المرور
// 6. Django Email Backend بدلاً من إرسال البريد الإلكتروني
// 7. Django Security Middleware بدلاً من حماية النموذج
```

#### 2.2.2 صفحة تفاصيل الدورة
```typescript
// src/pages/CourseDetailPage.tsx
// TODO: في Django، سيتم استخدام:
// 1. Django Class-Based Views بدلاً من المكونات
// 2. Django Templates بدلاً من JSX
// 3. Django ORM بدلاً من استدعاءات API
// 4. Django Forms بدلاً من التحكم في النماذج
// 5. Django Messages Framework بدلاً من إدارة الأخطاء
// 6. Django Content Types Framework بدلاً من إدارة المحتوى
// 7. Django Signals بدلاً من الأحداث
// 8. Django Permissions بدلاً من التحقق من الصلاحيات
// 9. Django Caching Framework بدلاً من التخزين المؤقت
```

### 2.3 الخدمات (Services)
#### 2.3.1 خدمة المصادقة
```typescript
// src/services/authService.ts
// TODO: في Django، سيتم استخدام:
// 1. Django Authentication System بدلاً من خدمة المصادقة
// 2. Django REST Framework Authentication بدلاً من JWT
// 3. Django Session Framework بدلاً من إدارة الجلسات
// 4. Django User Model بدلاً من نموذج المستخدم المخصص
// 5. Django Password Hashing بدلاً من تشفير كلمة المرور
```

#### 2.3.2 خدمة الدورات
```typescript
// src/services/courseService.ts
// TODO: في Django، سيتم استخدام:
// 1. Django REST Framework بدلاً من خدمة الدورات
// 2. Django ORM بدلاً من استدعاءات API
// 3. Django Serializers بدلاً من تحويل البيانات
// 4. Django Views بدلاً من معالجة الطلبات
// 5. Django URLs بدلاً من توجيه API
```

### 2.4 السياق (Context)
```typescript
// src/contexts/AuthContext.tsx
// TODO: في Django، سيتم استخدام:
// 1. Django Context Processors بدلاً من Context
// 2. Django Template Context بدلاً من تمرير البيانات
// 3. Django Session Framework بدلاً من إدارة الحالة
// 4. Django User Model بدلاً من نموذج المستخدم
// 5. Django Authentication Middleware بدلاً من التحقق من المصادقة
```

## 3. تكامل Django REST Framework

### 3.1 Serializers
```python
# TODO: تحويل TypeScript interfaces إلى Django Serializers
# مثال:
from rest_framework import serializers

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
```

### 3.2 Views
```python
# TODO: تحويل React components إلى Django Views
# مثال:
from rest_framework import viewsets

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
```

### 3.3 URLs
```python
# TODO: تحويل React Router إلى Django URLs
# مثال:
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

## 4. إدارة البيانات

### 4.1 النماذج (Models)
```python
# TODO: تحويل TypeScript interfaces إلى Django Models
# مثال:
from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
```

### 4.2 الترحيل (Migrations)
```bash
# TODO: إنشاء وتطبيق الترحيلات
python manage.py makemigrations
python manage.py migrate
```

## 5. الأمان

### 5.1 المصادقة
```python
# TODO: تكوين المصادقة
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

### 5.2 الصلاحيات
```python
# TODO: تكوين الصلاحيات
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
```

## 6. التخزين المؤقت

### 6.1 إعداد التخزين المؤقت
```python
# TODO: تكوين التخزين المؤقت
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}
```

## 7. الإشعارات

### 7.1 إعداد الإشعارات
```python
# TODO: تكوين الإشعارات
INSTALLED_APPS = [
    ...
    'notifications',
]

# إعدادات البريد الإلكتروني
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
```

## 8. الاختبارات

### 8.1 اختبارات الوحدة
```python
# TODO: كتابة اختبارات الوحدة
from django.test import TestCase

class CourseTests(TestCase):
    def setUp(self):
        self.course = Course.objects.create(
            title="Test Course",
            description="Test Description",
            price=99.99
        )

    def test_course_creation(self):
        self.assertEqual(self.course.title, "Test Course")
```

## 9. النشر

### 9.1 إعدادات الإنتاج
```python
# TODO: تكوين إعدادات الإنتاج
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

### 9.2 جمع الملفات الثابتة
```bash
# TODO: جمع الملفات الثابتة
python manage.py collectstatic
```

## 10. المراجع

### 10.1 وثائق Django
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework Documentation](https://www.django-rest-framework.org/)

### 10.2 أدوات مفيدة
- [Django Debug Toolbar](https://django-debug-toolbar.readthedocs.io/)
- [Django Extensions](https://django-extensions.readthedocs.io/)
- [Django REST Framework](https://www.django-rest-framework.org/)

## 11. أفضل الممارسات

### 11.1 هيكل المشروع
- استخدام تطبيقات Django منفصلة لكل وظيفة
- تنظيم الكود بشكل منطقي
- استخدام أسماء واضحة للمتغيرات والدوال

### 11.2 الأمان
- استخدام HTTPS
- حماية البيانات الحساسة
- التحقق من الصلاحيات
- معالجة الأخطاء بشكل آمن

### 11.3 الأداء
- استخدام التخزين المؤقت
- تحسين استعلامات قاعدة البيانات
- تقليل حجم الاستجابات
- استخدام التحميل الكسول للبيانات

## 12. استكشاف الأخطاء وإصلاحها

### 12.1 المشاكل الشائعة
- مشاكل CORS
- مشاكل المصادقة
- مشاكل الصلاحيات
- مشاكل الأداء

### 12.2 الحلول
- تكوين CORS بشكل صحيح
- التحقق من إعدادات المصادقة
- مراجعة الصلاحيات
- تحسين الأداء

## 13. التحديثات المستقبلية

### 13.1 الميزات المقترحة
- دعم المدفوعات
- نظام التقييمات
- نظام التعليقات
- نظام الإشعارات

### 13.2 التحسينات
- تحسين الأداء
- تحسين الأمان
- تحسين تجربة المستخدم
- تحسين التوثيق 