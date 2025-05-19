export interface InstructorApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  specialization: string;
  experience: string;
  qualifications: string;
  portfolio?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface InstructorProfile extends InstructorApplication {
  bio: string;
  avatar: string;
  socialLinks: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  rating: number;
  totalStudents: number;
  totalCourses: number;
  totalReviews: number;
}

// تعريف واجهة أرباح المدرب - تحتوي على تفاصيل أرباح المدرب من الدورات
export interface InstructorEarnings {
  id: string;
  instructorId: string;
  courseId: string;
  courseName: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
  paymentMethod?: string;
}

// تعريف واجهة إحصائيات المدرب - تحتوي على إحصائيات أداء المدرب
export interface InstructorStats {
  totalStudents: number;
  totalCourses: number;
  totalEarnings: number;
  totalReviews: number;
  averageRating: number;
  monthlyStats: {
    month: string;
    earnings: number;
    newStudents: number;
    newReviews: number;
  }[];
}

// تعريف واجهة إشعارات المدرب - تحتوي على الإشعارات المرسلة للمدرب
export interface InstructorNotification {
  id: string;
  instructorId: string;
  type: 'application' | 'course' | 'review' | 'question' | 'earning';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: {
    courseId?: string;
    questionId?: string;
    reviewId?: string;
    applicationId?: string;
  };
}

// تعريف واجهة خطوات إنشاء الدورة - تستخدم لتتبع تقدم إنشاء الدورة
export interface CourseCreationStep {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
}

// تعريف واجهة قسم الدورة - تحتوي على أقسام الدورة ودروسها
export interface CourseSection {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLessonDraft[];
}

export interface CourseLessonDraft {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  videoUrl?: string;
  videoFile?: File;
  uploadProgress?: number;
  uploadStatus: 'pending' | 'uploading' | 'completed' | 'error';
  resources: {
    id: string;
    title: string;
    type: string;
    url: string;
    size: number;
  }[];
}

// تعريف واجهة المعلومات الأساسية للدورة - تحتوي على المعلومات الأساسية المطلوبة لإنشاء دورة
export interface CourseBasicInfo {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  coverImage?: File;
  previewVideo?: File;
  tags: string[];
  learningObjectives: string[];
  requirements: string[];
}

// تعريف واجهة تسعير الدورة - تحتوي على معلومات تسعير الدورة والخصومات
export interface CoursePricing {
  price: number;
  currency: string;
  hasDiscount: boolean;
  discountPrice?: number;
  discountStartDate?: string;
  discountEndDate?: string;
}

// تعريف واجهة تحليلات الدورة - تحتوي على إحصائيات وتحليلات أداء الدورة
export interface CourseAnalytics {
  id: string;
  views: number;
  sales: number;
  revenue: number;
  rating: number;
  totalReviews: number;
  completionRate: number;
  studentEngagement: {
    date: string;
    activeStudents: number;
  }[];
  lessonProgress: {
    lessonId: string;
    lessonTitle: string;
    completions: number;
    avgWatchTime: number;
  }[];
}

export interface StudentReviewDetailed {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  courseId: string;
  courseName: string;
  helpful: number;
  response?: {
    id: string;
    instructorName: string;
    comment: string;
    date: string;
  };
} 