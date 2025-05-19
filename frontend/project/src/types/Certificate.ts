// تعريف واجهة الشهادة - تحتوي على معلومات شهادة إكمال الدورة
export interface Certificate {
  id: string;                    // معرف الشهادة
  userId: string;                // معرف الطالب
  courseId: string;              // معرف الدورة
  courseName: string;            // اسم الدورة
  studentName: string;           // اسم الطالب
  issueDate: Date;              // تاريخ إصدار الشهادة
  certificateNumber: string;     // رقم الشهادة
  grade: string;                 // الدرجة النهائية
  completionDate: Date;          // تاريخ إكمال الدورة
  instructorName: string;        // اسم المدرب
  instructorTitle: string;       // لقب المدرب
  courseHours: number;           // عدد ساعات الدورة
  skills: string[];             // المهارات المكتسبة
  qrCode?: string;              // رمز QR للتحقق من صحة الشهادة
  pdfUrl?: string;              // رابط تحميل نسخة PDF من الشهادة
}

// TODO: في Django، سيتم استخدام:
// 1. Django Model للشهادة مع حقول مناسبة
// 2. Django Signals لتوليد الشهادات تلقائياً عند إكمال الدورة
// 3. Django Template لتصميم الشهادة
// 4. Django View لإنشاء وتحميل الشهادات
// 5. Django Admin لإدارة الشهادات

export interface CertificateTemplate {
  id: string;
  name: string;
  background: string;
  font: string;
  color: string;
  orientation: 'landscape' | 'portrait';
} 