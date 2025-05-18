export interface Course {
  id: string | number;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  thumbnail: string;
  image?: string;
  discount?: number;
  category?: string;
  rating?: number;
  students?: number;
  tags?: string[];
  isFeatured?: boolean;
  certification: {
    type: string;
    validity: string;
    validityPeriod?: string;
    accreditedBy?: string;
    badgeUrl?: string;
  };
  instructorDetails: {
    name: string;
    avatar: string;
    expertise: string[];
    bio?: string;
    rating?: number;
    totalStudents?: number;
    totalCourses?: number;
  };
  lessons: {
    id: string | number;
    title: string;
    duration: string;
    videoUrl?: string;
  }[];
  stats?: {
    totalHours: number;
    totalLectures: number;
    totalQuizzes: number;
    certificateOffered: boolean;
    lastUpdated: string;
    language: string;
    totalAssignments: number;
    totalProjects: number;
    completionRate: number;
    avgCompletionTime: string;
    difficulty: number;
    successRate: number;
  };
  whatYouWillLearn?: string[];
  requirements?: string[];
  topics?: string[];
  skills?: string[];
  isBookmarked?: boolean;
  learningOutcomes?: string[];
  prerequisites?: string[];
  courseProgress?: {
    completed: number;
    totalUnits: number;
    lastAccessed?: string;
  };
  reviews?: {
    rating: number;
    comment: string;
    userName: string;
    userAvatar: string;
    date: string;
    helpful: number;
  }[];
  nextStartDate?: string;
  language?: string;
  subtitles?: string[];
  materials?: {
    type: string;
    count: number;
  }[];
  supportedDevices?: string[];
  accessType?: 'lifetime' | 'limited';
  validityPeriod?: string;
} 