// تعريف واجهة الدورة - تحتوي على المعلومات الأساسية للدورة
export interface Course {
  id: string | number;           // معرف الدورة
  title: string;                 // عنوان الدورة
  description: string;           // وصف الدورة
  price: number;                 // سعر الدورة
  duration: string;              // مدة الدورة
  level: 'Beginner' | 'Intermediate' | 'Advanced';  // مستوى الدورة
  thumbnail: string;             // صورة مصغرة
  image?: string;                // صورة كاملة
  previewVideo?: string;         // فيديو معاينة
  discount?: number;             // نسبة الخصم
  category?: string;             // التصنيف
  rating?: number;               // التقييم
  students?: number;             // عدد الطلاب
  tags?: string[];              // الوسوم
  isFeatured?: boolean;         // هل الدورة مميزة
  stats?: {                     // إحصائيات الدورة
    totalHours: number;         // إجمالي الساعات
    totalLectures: number;      // إجمالي المحاضرات
    totalQuizzes: number;       // إجمالي الاختبارات
    certificateOffered: boolean;  // هل تقدم شهادة
    lastUpdated: string;        // آخر تحديث
    language: string;           // لغة الدورة
    totalAssignments: number;   // إجمالي الواجبات
    totalProjects: number;      // إجمالي المشاريع
    completionRate: number;     // نسبة الإكمال
    avgCompletionTime: string;  // متوسط وقت الإكمال
    difficulty: number;         // مستوى الصعوبة
    successRate: number;        // نسبة النجاح
  };
  certification?: {             // معلومات الشهادة
    type: string;               // نوع الشهادة
    validity: string;           // صلاحية الشهادة
    validityPeriod?: string;    // مدة الصلاحية
    accreditedBy?: string;      // الجهة المانحة
    badgeUrl?: string;          // رابط الشارة
  };
  instructorDetails: {          // تفاصيل المدرب
    name: string;               // اسم المدرب
    avatar: string;             // صورة المدرب
    expertise: string[];        // مجالات الخبرة
    bio?: string;               // نبذة عن المدرب
    rating?: number;            // تقييم المدرب
    totalStudents?: number;     // إجمالي الطلاب
    totalCourses?: number;      // إجمالي الدورات
  };
  sections: {                   // أقسام الدورة
    id: string;                 // معرف القسم
    title: string;              // عنوان القسم
    description: string;        // وصف القسم
    order: number;              // ترتيب القسم
    lessons: {                  // دروس القسم
      id: string;               // معرف الدرس
      title: string;            // عنوان الدرس
      description: string;      // وصف الدرس
      duration: string;         // مدة الدرس
      videoUrl: string;         // رابط الفيديو
      uploadStatus: 'pending' | 'uploading' | 'completed' | 'error';  // حالة الرفع
      attachments?: {           // المرفقات
        id: string;             // معرف المرفق
        name: string;           // اسم المرفق
        url: string;            // رابط المرفق
        size: string;           // حجم المرفق
      }[];
    }[];
  }[];
  whatYouWillLearn?: string[];  // ما سوف تتعلمه
  requirements?: string[];      // المتطلبات
  topics?: string[];           // المواضيع
  skills?: string[];           // المهارات
  isBookmarked?: boolean;      // هل الدورة محفوظة
  learningOutcomes?: string[];  // النتائج التعليمية
  prerequisites?: string[];     // المتطلبات المسبقة
  courseProgress?: {           // تقدم الدورة
    completed: number;         // نسبة الإكمال
    totalUnits: number;        // إجمالي الوحدات
    lastAccessed?: string;     // آخر دخول
  };
  reviews?: {                  // التقييمات
    rating: number;            // التقييم
    comment: string;           // التعليق
    userName: string;          // اسم المستخدم
    userAvatar: string;        // صورة المستخدم
    date: string;              // التاريخ
    helpful: number;           // عدد الإعجابات
  }[];
  nextStartDate?: string;      // تاريخ البدء القادم
  language?: string;           // لغة الدورة
  subtitles?: string[];        // اللغات المدعومة للترجمة
  materials?: {                // المواد التعليمية
    type: string;              // نوع المادة
    count: number;             // العدد
  }[];
  supportedDevices?: string[];  // الأجهزة المدعومة
  accessType?: 'lifetime' | 'limited';  // نوع الوصول
  validityPeriod?: string;     // مدة الصلاحية
}

// تعريف واجهة قسم الدورة - تحتوي على معلومات قسم من أقسام الدورة
export interface CourseSection {
  id: string;                    // معرف القسم
  title: string;                 // عنوان القسم
  description: string;           // وصف القسم
  order: number;                 // ترتيب القسم
  lessons: Lesson[];             // دروس القسم
}

// تعريف واجهة الدرس - تحتوي على معلومات درس من دروس الدورة
export interface Lesson {
  id: string;                    // معرف الدرس
  title: string;                 // عنوان الدرس
  description: string;           // وصف الدرس
  duration: string;              // مدة الدرس
  videoUrl: string;              // رابط الفيديو
  attachments: Attachment[];     // المرفقات
  order: number;                 // ترتيب الدرس
  isCompleted?: boolean;         // هل تم إكمال الدرس
}

// تعريف واجهة المرفق - تحتوي على معلومات مرفق من مرفقات الدرس
export interface Attachment {
  id: string;                    // معرف المرفق
  name: string;                  // اسم المرفق
  url: string;                   // رابط المرفق
  type: string;                  // نوع المرفق
  size: number;                  // حجم المرفق
}

// TODO: في Django، سيتم استخدام:
// 1. Django Models للدورات والأقسام والدروس
// 2. Django Model Relationships لتحديد العلاقات بين الجداول
// 3. Django Model Methods للوظائف المخصصة مثل:
//    - حساب تقدم الطالب
//    - تحديث إحصائيات الدورة
//    - التحقق من صلاحية الشهادة
// 4. Django Model Validators للتحقق من صحة البيانات
// 5. Django Admin لإدارة الدورات
// 6. Django Signals لتحديث:
//    - إحصائيات المدرب
//    - تقدم الطلاب
//    - إشعارات المستخدمين
// 7. Django Permissions للتحكم في الصلاحيات
// 8. Django Cache لتحسين الأداء
// 9. Django Celery للمهام الطويلة مثل:
//    - معالجة الفيديوهات
//    - إنشاء الشهادات
//    - تحديث الإحصائيات
// 10. Django Storage لإدارة الملفات
// 11. Django REST Framework للـ API
// 12. Django Channels للتواصل المباشر 