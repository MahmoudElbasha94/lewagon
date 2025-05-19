// تعريف واجهة السؤال - تحتوي على معلومات السؤال وخياراته
export interface Question {
  id: string;                    // معرف السؤال
  text: string;                  // نص السؤال
  type: 'multiple_choice' | 'true_false' | 'short_answer';  // نوع السؤال
  options?: string[];           // خيارات الإجابة للسؤال متعدد الخيارات
  correctAnswer: string | string[];  // الإجابة الصحيحة
  points: number;               // عدد النقاط للسؤال
  explanation?: string;         // شرح الإجابة الصحيحة
  order: number;                // ترتيب السؤال في الاختبار
}

// تعريف واجهة الاختبار - تحتوي على معلومات الاختبار وأسئلته
export interface Quiz {
  id: string;                    // معرف الاختبار
  courseId: string;              // معرف الدورة
  title: string;                 // عنوان الاختبار
  description: string;           // وصف الاختبار
  questions: Question[];         // أسئلة الاختبار
  timeLimit?: number;           // الحد الزمني للاختبار بالدقائق
  passingScore: number;         // درجة النجاح
  attemptsAllowed: number;      // عدد المحاولات المسموحة
  shuffleQuestions: boolean;    // خلط الأسئلة
  showResults: boolean;         // إظهار النتائج مباشرة
  createdAt: Date;              // تاريخ الإنشاء
  updatedAt: Date;              // تاريخ التحديث
}

// تعريف واجهة محاولة الطالب - تحتوي على معلومات محاولة الطالب في الاختبار
export interface StudentQuizAttempt {
  id: string;                    // معرف المحاولة
  studentId: string;             // معرف الطالب
  quizId: string;                // معرف الاختبار
  answers: {                     // إجابات الطالب
    questionId: string;          // معرف السؤال
    answer: string | string[];   // إجابة الطالب
    isCorrect?: boolean;         // هل الإجابة صحيحة
  }[];
  score: number;                 // الدرجة النهائية
  timeSpent: number;             // الوقت المستغرق بالدقائق
  completed: boolean;            // هل اكتملت المحاولة
  startedAt: Date;               // وقت بدء المحاولة
  submittedAt?: Date;            // وقت تسليم المحاولة
}

// TODO: في Django، سيتم استخدام:
// 1. Django Models للاختبارات والأسئلة والمحاولات
// 2. Django Forms للتحقق من صحة الإجابات
// 3. Django Views لمعالجة محاولات الاختبار
// 4. Django Admin لإدارة الاختبارات والأسئلة
// 5. Django Signals لتحديث تقدم الطالب تلقائياً 