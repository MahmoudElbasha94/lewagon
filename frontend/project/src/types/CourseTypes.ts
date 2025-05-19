// تعريف واجهة المعلومات الأساسية للدورة - تستخدم في تحديث معلومات الدورة
export interface CourseBasicInfo {
  title?: string;                // عنوان الدورة
  subtitle?: string;             // العنوان الفرعي
  description?: string;          // وصف الدورة
  category?: string;             // تصنيف الدورة
  level?: 'beginner' | 'intermediate' | 'advanced';  // مستوى الدورة
  language?: string;             // لغة الدورة
  price?: number;                // سعر الدورة
  discountPrice?: number;        // سعر الخصم
  coverImage?: File;             // صورة الغلاف
  previewVideo?: File;           // فيديو المعاينة
  tags?: string[];              // الوسوم
  requirements?: string[];       // المتطلبات
  objectives?: string[];         // الأهداف التعليمية
  isPublished?: boolean;         // حالة النشر
}

// تعريف واجهة اختبار الدورة - تحتوي على معلومات اختبار في الدورة
export interface CourseQuiz {
  id: string;                    // معرف الاختبار
  courseId: string;              // معرف الدورة
  sectionId: string;             // معرف القسم
  title: string;                 // عنوان الاختبار
  description: string;           // وصف الاختبار
  questions: QuizQuestion[];     // أسئلة الاختبار
  duration: number;              // مدة الاختبار بالدقائق
  passingScore: number;          // درجة النجاح
  attempts: number;              // عدد المحاولات المسموحة
  isPublished: boolean;          // حالة النشر
  createdAt: string;             // تاريخ الإنشاء
  updatedAt: string;             // تاريخ التحديث
}

// تعريف واجهة سؤال الاختبار - تحتوي على معلومات سؤال في الاختبار
export interface QuizQuestion {
  id: string;                    // معرف السؤال
  quizId: string;                // معرف الاختبار
  question: string;              // نص السؤال
  type: 'multiple_choice' | 'true_false' | 'short_answer';  // نوع السؤال
  options: QuizOption[];         // خيارات الإجابة
  correctAnswer: string | number;  // الإجابة الصحيحة
  points: number;                // عدد النقاط
  explanation?: string;          // شرح الإجابة
  order: number;                 // ترتيب السؤال
}

// تعريف واجهة خيار السؤال - تحتوي على معلومات خيار في السؤال
export interface QuizOption {
  id: string;                    // معرف الخيار
  text: string;                  // نص الخيار
  isCorrect: boolean;            // هل هو الإجابة الصحيحة
}

// تعريف واجهة محاولة الطالب في الاختبار - تحتوي على معلومات محاولة الطالب
export interface StudentQuizAttempt {
  id: string;                    // معرف المحاولة
  quizId: string;                // معرف الاختبار
  studentId: string;             // معرف الطالب
  answers: {                     // إجابات الطالب
    questionId: string;          // معرف السؤال
    answer: string | number;     // إجابة الطالب
  }[];
  score: number;                 // الدرجة النهائية
  passed: boolean;               // هل نجح الطالب
  startedAt: string;             // وقت البدء
  completedAt: string;           // وقت الإنهاء
}

// تعريف واجهة سؤال الطالب في الدورة - تحتوي على سؤال الطالب
export interface CourseQuestion {
  id: string;                    // معرف السؤال
  courseId: string;              // معرف الدورة
  lessonId: string;              // معرف الدرس
  studentId: string;             // معرف الطالب
  studentName: string;           // اسم الطالب
  question: string;              // نص السؤال
  createdAt: string;             // تاريخ السؤال
  status: 'pending' | 'answered';  // حالة السؤال
  answer?: {                     // إجابة المدرب
    content: string;             // محتوى الإجابة
    answeredAt: string;          // تاريخ الإجابة
    instructorId: string;        // معرف المدرب
    instructorName: string;      // اسم المدرب
  };
  isPublic: boolean;             // هل السؤال عام
  likes: number;                 // عدد الإعجابات
  replies: QuestionReply[];      // الردود
}

// تعريف واجهة رد على السؤال - تحتوي على رد على سؤال الطالب
export interface QuestionReply {
  id: string;                    // معرف الرد
  questionId: string;            // معرف السؤال
  userId: string;                // معرف المستخدم
  userName: string;              // اسم المستخدم
  userRole: 'student' | 'instructor';  // دور المستخدم
  content: string;               // محتوى الرد
  createdAt: string;             // تاريخ الرد
  likes: number;                 // عدد الإعجابات
}

// تعريف واجهة إدارة الدورة - تحتوي على وظائف إدارة الدورة
export interface CourseManagement {
  updateCourse: (courseId: string, data: Partial<CourseBasicInfo>) => Promise<boolean>;
  deleteCourse: (courseId: string) => Promise<boolean>;
  publishCourse: (courseId: string) => Promise<boolean>;
  unpublishCourse: (courseId: string) => Promise<boolean>;
  addQuiz: (courseId: string, sectionId: string, quiz: Omit<CourseQuiz, 'id' | 'courseId' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateQuiz: (quizId: string, data: Partial<CourseQuiz>) => Promise<boolean>;
  deleteQuiz: (quizId: string) => Promise<boolean>;
  answerQuestion: (questionId: string, answer: string) => Promise<boolean>;
}

// تعريف واجهة تقدم الطالب في الدورة - تحتوي على معلومات تقدم الطالب
export interface CourseProgress {
  id: string;                    // معرف التقدم
  userId: string;                // معرف الطالب
  courseId: string;              // معرف الدورة
  completedLessons: string[];    // الدروس المكتملة
  currentLesson: string;         // الدرس الحالي
  progress: number;              // نسبة التقدم
  lastAccessed: Date;            // آخر وقت دخول
  startedAt: Date;               // وقت البدء
  completedAt?: Date;            // وقت الإكمال
}

// تعريف واجهة تقييم الدورة - تحتوي على تقييم الطالب للدورة
export interface CourseReview {
  id: string;                    // معرف التقييم
  userId: string;                // معرف الطالب
  courseId: string;              // معرف الدورة
  rating: number;                // التقييم
  comment: string;               // التعليق
  date: Date;                    // تاريخ التقييم
  helpful: number;               // عدد الإعجابات
  userAvatar?: string;           // صورة الطالب
  userName: string;              // اسم الطالب
}

// تعريف واجهة سؤال الطالب - تحتوي على سؤال الطالب في الدورة
export interface CourseQuestion {
  id: string;                    // معرف السؤال
  userId: string;                // معرف الطالب
  courseId: string;              // معرف الدورة
  lessonId: string;              // معرف الدرس
  title: string;                 // عنوان السؤال
  content: string;               // محتوى السؤال
  date: Date;                    // تاريخ السؤال
  answers: CourseAnswer[];       // الإجابات
  isResolved: boolean;           // هل تم الحل
}

// تعريف واجهة إجابة السؤال - تحتوي على إجابة على سؤال الطالب
export interface CourseAnswer {
  id: string;                    // معرف الإجابة
  questionId: string;            // معرف السؤال
  userId: string;                // معرف المستخدم
  content: string;               // محتوى الإجابة
  date: Date;                    // تاريخ الإجابة
  isInstructor: boolean;         // هل من المدرب
  helpful: number;               // عدد الإعجابات
  userAvatar?: string;           // صورة المستخدم
  userName: string;              // اسم المستخدم
}

// تعريف واجهة ملاحظات الطالب - تحتوي على ملاحظات الطالب في الدرس
export interface CourseNote {
  id: string;                    // معرف الملاحظة
  userId: string;                // معرف الطالب
  courseId: string;              // معرف الدورة
  lessonId: string;              // معرف الدرس
  content: string;               // محتوى الملاحظة
  timestamp: string;             // وقت الملاحظة في الفيديو
  date: Date;                    // تاريخ الملاحظة
}

// TODO: في Django، سيتم استخدام:
// 1. Django Models لتتبع التقدم والتقييمات والأسئلة
// 2. Django Model Relationships لتحديد العلاقات بين الجداول
// 3. Django Model Methods للوظائف المخصصة
// 4. Django Model Validators للتحقق من صحة البيانات
// 5. Django Admin لإدارة المحتوى
// 6. Django Signals لتحديث التقدم والإحصائيات تلقائياً 