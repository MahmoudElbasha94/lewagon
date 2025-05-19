export interface Course {
  id: string | number;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  image?: string;
  previewVideo?: string;
  discount?: number;
  category?: string;
  rating?: number;
  students?: number;
  tags?: string[];
  isFeatured?: boolean;
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
  certification?: {
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
  sections: {
    id: string;
    title: string;
    description: string;
    order: number;
    lessons: {
      id: string;
      title: string;
      description: string;
      duration: string;
      videoUrl: string;
      uploadStatus: 'pending' | 'uploading' | 'completed' | 'error';
      attachments?: {
        id: string;
        name: string;
        url: string;
        size: string;
      }[];
    }[];
  }[];
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