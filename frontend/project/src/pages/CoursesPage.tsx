import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, Users, Star, ChevronDown, Bookmark, BookOpen, Sparkles, TrendingUp, Award, Heart, Share2, Play, X, CheckCircle, ArrowRight, ThumbsUp, ChevronRight, GraduationCap } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  thumbnail: string;
  category: string;
  tags: string[];
  isFeatured?: boolean;
  discount?: number;
  description: string;
  stats: CourseStats;
  topics: string[];
  previewVideo?: string;
  skills: string[];
  isBookmarked?: boolean;
  learningOutcomes: string[];
  prerequisites: string[];
  instructorDetails: {
    name: string;
    bio: string;
    avatar: string;
    expertise: string[];
    rating: number;
    totalStudents: number;
    totalCourses: number;
  };
  courseProgress?: {
    completed: number;
    totalUnits: number;
    lastAccessed?: string;
  };
  reviews: {
    rating: number;
    comment: string;
    userName: string;
    userAvatar: string;
    date: string;
    helpful: number;
  }[];
  nextStartDate?: string;
  language: string;
  subtitles: string[];
  certification: {
    type: string;
    validityPeriod?: string;
    accreditedBy?: string;
    badgeUrl?: string;
  };
  materials: {
    type: string;
    count: number;
  }[];
  supportedDevices: string[];
  accessType: 'lifetime' | 'limited';
  validityPeriod?: string;
}

interface Category {
  name: string;
  icon: string;
  count: number;
}

interface CourseStats {
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
}

const categories: Category[] = [
  { name: 'Programming', icon: '💻', count: 150 },
  { name: 'Design', icon: '🎨', count: 89 },
  { name: 'Business', icon: '💼', count: 120 },
  { name: 'Marketing', icon: '📊', count: 95 },
  { name: 'Photography', icon: '📸', count: 75 },
  { name: 'Music', icon: '🎵', count: 60 },
  { name: 'Data Science', icon: '📊', count: 110 },
  { name: 'Personal Development', icon: '🎯', count: 85 },
];

const allCourses: Course[] = [
  {
    id: 1,
    title: 'Complete React Developer Course',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 15420,
    duration: '22h 30m',
    level: 'Intermediate',
    price: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    category: 'Programming',
    tags: ['React', 'JavaScript', 'Web Development'],
    isFeatured: true,
    discount: 20,
    description: 'Master React 18 with Redux, Hooks, and all the modern tools and best practices used by top companies.',
    stats: {
      totalHours: 22.5,
      totalLectures: 280,
      totalQuizzes: 35,
      certificateOffered: true,
      lastUpdated: '2024-02-15',
      language: 'English',
      totalAssignments: 24,
      totalProjects: 4,
      completionRate: 85,
      avgCompletionTime: '3 months',
      difficulty: 7,
      successRate: 92
    },
    topics: [
      'React Fundamentals',
      'State Management with Redux',
      'React Hooks in Depth',
      'Performance Optimization',
      'Testing React Applications'
    ],
    previewVideo: 'https://example.com/preview.mp4',
    skills: ['React.js', 'Redux', 'JavaScript', 'Web Development', 'Frontend Development'],
    isBookmarked: false,
    learningOutcomes: [
      'Build production-ready React applications',
      'Implement complex state management with Redux',
      'Master React Hooks and Custom Hooks',
      'Write clean, maintainable React code',
      'Deploy React applications to production'
    ],
    prerequisites: [
      'Basic JavaScript knowledge',
      'HTML & CSS fundamentals',
      'Understanding of web development concepts'
    ],
    instructorDetails: {
      name: 'Sarah Johnson',
      bio: 'Senior Frontend Developer with 10+ years of experience in React and modern JavaScript frameworks',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['React', 'JavaScript', 'Frontend Architecture', 'Web Performance'],
      rating: 4.9,
      totalStudents: 45000,
      totalCourses: 8
    },
    reviews: [
      {
        rating: 5,
        comment: 'Excellent course! Sarah explains complex concepts in a very clear way.',
        userName: 'John Doe',
        userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        date: '2024-02-10',
        helpful: 156
      },
      {
        rating: 4,
        comment: 'Very comprehensive coverage of React. Great projects!',
        userName: 'Emma Wilson',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        date: '2024-02-08',
        helpful: 89
      }
    ],
    nextStartDate: '2024-03-01',
    language: 'English',
    subtitles: ['English', 'Spanish', 'Arabic', 'French'],
    certification: {
      type: 'Professional Certificate',
      validityPeriod: 'Lifetime',
      accreditedBy: 'React Development Association',
      badgeUrl: 'https://example.com/react-cert-badge.png'
    },
    materials: [
      { type: 'Video Lectures', count: 280 },
      { type: 'Coding Exercises', count: 150 },
      { type: 'Projects', count: 4 },
      { type: 'PDF Resources', count: 35 }
    ],
    supportedDevices: ['Desktop', 'Mobile', 'Tablet'],
    accessType: 'lifetime'
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    instructor: 'Michael Chen',
    rating: 4.9,
    students: 12800,
    duration: '18h 45m',
    level: 'Beginner',
    price: 79.99,
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    category: 'Design',
    tags: ['UI Design', 'UX Design', 'Figma'],
    description: 'Learn UI/UX design from scratch with industry best practices and modern tools.',
    stats: {
      totalHours: 18.75,
      totalLectures: 220,
      totalQuizzes: 25,
      certificateOffered: true,
      lastUpdated: '2024-02-10',
      language: 'English',
      totalAssignments: 5,
      totalProjects: 2,
      completionRate: 75,
      avgCompletionTime: '1h 45m',
      difficulty: 3,
      successRate: 80
    },
    topics: ['UI Fundamentals', 'UX Research', 'Figma Mastery'],
    skills: ['Figma', 'UI Design', 'UX Design', 'Prototyping'],
    isBookmarked: false,
    learningOutcomes: [
      'Understand UI/UX design principles',
      'Use Figma for designing UI/UX',
      'Conduct UX research',
      'Prototype UI/UX designs',
      'Apply UI/UX design best practices'
    ],
    prerequisites: ['Basic design principles', 'Understanding of web design'],
    instructorDetails: {
      name: 'Michael Chen',
      bio: 'Michael is a UI/UX designer with over 8 years of experience in the industry.',
      avatar: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      expertise: ['UI Design', 'UX Design', 'Figma'],
      rating: 4.9,
      totalStudents: 12800,
      totalCourses: 3
    },
    courseProgress: {
      completed: 18,
      totalUnits: 22,
      lastAccessed: '2024-02-10'
    },
    reviews: [
      {
        rating: 5,
        comment: 'Great course! Michael explains concepts very well.',
        userName: 'Alice Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        date: '2024-02-10',
        helpful: 10
      },
      {
        rating: 4.5,
        comment: 'Some parts were a bit too slow for me, but overall good.',
        userName: 'Bob Smith',
        userAvatar: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        date: '2024-02-05',
        helpful: 7
      }
    ],
    nextStartDate: '2024-03-05',
    language: 'English',
    subtitles: ['English'],
    certification: {
      type: 'Certificate of Completion',
      validityPeriod: '1 year',
      accreditedBy: 'Coursera',
      badgeUrl: 'https://example.com/ux-certificate.jpg'
    },
    materials: [
      { type: 'Video', count: 220 },
      { type: 'Quiz', count: 25 },
      { type: 'Project', count: 2 },
      { type: 'Assignment', count: 5 }
    ],
    supportedDevices: ['Desktop', 'Mobile'],
    accessType: 'lifetime',
    validityPeriod: '1 year'
  },
  {
    id: 3,
    title: 'Advanced Data Science with Python',
    instructor: 'Emily Rodriguez',
    rating: 4.7,
    students: 9850,
    duration: '28h 15m',
    level: 'Advanced',
    price: 99.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    category: 'Data Science',
    tags: ['Python', 'Machine Learning', 'Data Analysis'],
    description: 'Master data science and machine learning using Python and popular frameworks.',
    stats: {
      totalHours: 28.25,
      totalLectures: 340,
      totalQuizzes: 45,
      certificateOffered: true,
      lastUpdated: '2024-02-12',
      language: 'English',
      totalAssignments: 15,
      totalProjects: 10,
      completionRate: 70,
      avgCompletionTime: '3h 15m',
      difficulty: 5,
      successRate: 60
    },
    topics: ['Python for Data Science', 'Machine Learning', 'Deep Learning'],
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
    isBookmarked: false,
    learningOutcomes: [
      'Understand Python for data science',
      'Apply machine learning algorithms',
      'Analyze and interpret data',
      'Implement deep learning models',
      'Use popular Python libraries'
    ],
    prerequisites: ['Basic Python programming', 'Understanding of statistics'],
    instructorDetails: {
      name: 'Emily Rodriguez',
      bio: 'Emily is a data scientist with over 7 years of experience in the industry.',
      avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      expertise: ['Python', 'Machine Learning', 'Data Analysis'],
      rating: 4.7,
      totalStudents: 9850,
      totalCourses: 4
    },
    courseProgress: {
      completed: 28,
      totalUnits: 34,
      lastAccessed: '2024-02-12'
    },
    reviews: [
      {
        rating: 4.5,
        comment: 'Great course! Emily explains concepts very well.',
        userName: 'Charlie Davis',
        userAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        date: '2024-02-12',
        helpful: 8
      },
      {
        rating: 4,
        comment: 'Some parts were a bit too advanced for me.',
        userName: 'Eve Wilson',
        userAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        date: '2024-02-05',
        helpful: 5
      }
    ],
    nextStartDate: '2024-03-15',
    language: 'English',
    subtitles: ['English'],
    certification: {
      type: 'Certificate of Completion',
      validityPeriod: '1 year',
      accreditedBy: 'Coursera',
      badgeUrl: 'https://example.com/data-science-certificate.jpg'
    },
    materials: [
      { type: 'Video', count: 340 },
      { type: 'Quiz', count: 45 },
      { type: 'Project', count: 10 },
      { type: 'Assignment', count: 15 }
    ],
    supportedDevices: ['Desktop', 'Mobile'],
    accessType: 'lifetime',
    validityPeriod: '1 year'
  },
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    instructor: 'Alex Thompson',
    rating: 4.9,
    students: 8750,
    duration: '15h 45m',
    level: 'Beginner',
    price: 69.99,
    thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    category: 'Marketing',
    tags: ['Digital Marketing', 'Social Media', 'SEO'],
    discount: 15,
    description: 'Master digital marketing strategies for business growth and online presence.',
    stats: {
      totalHours: 15.75,
      totalLectures: 180,
      totalQuizzes: 20,
      certificateOffered: true,
      lastUpdated: '2024-02-08',
      language: 'English',
      totalAssignments: 5,
      totalProjects: 3,
      completionRate: 80,
      avgCompletionTime: '1h 45m',
      difficulty: 3,
      successRate: 75
    },
    topics: ['Digital Marketing Fundamentals', 'Social Media Marketing', 'SEO Optimization'],
    skills: ['Digital Marketing', 'Social Media', 'SEO', 'Content Marketing'],
    isBookmarked: false,
    learningOutcomes: [
      'Understand digital marketing fundamentals',
      'Implement social media marketing strategies',
      'Optimize SEO for online presence',
      'Create effective content marketing campaigns',
      'Analyze digital marketing performance'
    ],
    prerequisites: ['Understanding of business fundamentals', 'Basic digital marketing knowledge'],
    instructorDetails: {
      name: 'Alex Thompson',
      bio: 'Alex is a digital marketing expert with over 5 years of experience in the industry.',
      avatar: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      expertise: ['Digital Marketing', 'Social Media', 'SEO'],
      rating: 4.9,
      totalStudents: 8750,
      totalCourses: 2
    },
    courseProgress: {
      completed: 15,
      totalUnits: 18,
      lastAccessed: '2024-02-08'
    },
    reviews: [
      {
        rating: 5,
        comment: 'Excellent course! Alex explains concepts very well.',
        userName: 'Grace Miller',
        userAvatar: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        date: '2024-02-08',
        helpful: 10
      },
      {
        rating: 4.5,
        comment: 'Some parts were a bit too fast for me.',
        userName: 'Ian Harris',
        userAvatar: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        date: '2024-02-05',
        helpful: 7
      }
    ],
    nextStartDate: '2024-03-10',
    language: 'English',
    subtitles: ['English'],
    certification: {
      type: 'Certificate of Completion',
      validityPeriod: '1 year',
      accreditedBy: 'Coursera',
      badgeUrl: 'https://example.com/marketing-certificate.jpg'
    },
    materials: [
      { type: 'Video', count: 180 },
      { type: 'Quiz', count: 20 },
      { type: 'Project', count: 3 },
      { type: 'Assignment', count: 5 }
    ],
    supportedDevices: ['Desktop', 'Mobile'],
    accessType: 'lifetime',
    validityPeriod: '1 year'
  },
  {
    id: 5,
    title: 'Professional Photography Masterclass',
    instructor: 'Jessica Lee',
    rating: 4.7,
    students: 6320,
    duration: '20h 15m',
    level: 'Intermediate',
    price: 79.99,
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    category: 'Photography',
    tags: ['Photography', 'Editing', 'Composition'],
    description: 'Learn professional photography techniques from composition to post-processing.',
    stats: {
      totalHours: 20.25,
      totalLectures: 240,
      totalQuizzes: 30,
      certificateOffered: true,
      lastUpdated: '2024-02-05',
      language: 'English',
      totalAssignments: 7,
      totalProjects: 4,
      completionRate: 70,
      avgCompletionTime: '2h 15m',
      difficulty: 4,
      successRate: 65
    },
    topics: ['Photography Basics', 'Composition', 'Post-processing'],
    skills: ['Photography', 'Photo Editing', 'Composition', 'Lighting'],
    isBookmarked: false,
    learningOutcomes: [
      'Understand photography fundamentals',
      'Apply composition techniques',
      'Edit photos using post-processing tools',
      'Capture professional-quality images',
      'Use lighting techniques effectively'
    ],
    prerequisites: ['Basic photography knowledge', 'Understanding of lighting'],
    instructorDetails: {
      name: 'Jessica Lee',
      bio: 'Jessica is a professional photographer with over 5 years of experience in the industry.',
      avatar: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      expertise: ['Photography', 'Photo Editing', 'Composition'],
      rating: 4.7,
      totalStudents: 6320,
      totalCourses: 2
    },
    courseProgress: {
      completed: 20,
      totalUnits: 24,
      lastAccessed: '2024-02-05'
    },
    reviews: [
      {
        rating: 4.5,
        comment: 'Great course! Jessica explains concepts very well.',
        userName: 'Kate Thompson',
        userAvatar: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        date: '2024-02-05',
        helpful: 8
      },
      {
        rating: 4,
        comment: 'Some parts were a bit too slow for me.',
        userName: 'Liam Davis',
        userAvatar: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        date: '2024-02-02',
        helpful: 5
      }
    ],
    nextStartDate: '2024-03-10',
    language: 'English',
    subtitles: ['English'],
    certification: {
      type: 'Certificate of Completion',
      validityPeriod: '1 year',
      accreditedBy: 'Coursera',
      badgeUrl: 'https://example.com/photography-certificate.jpg'
    },
    materials: [
      { type: 'Video', count: 240 },
      { type: 'Quiz', count: 30 },
      { type: 'Project', count: 4 },
      { type: 'Assignment', count: 7 }
    ],
    supportedDevices: ['Desktop', 'Mobile'],
    accessType: 'lifetime',
    validityPeriod: '1 year'
  },
  {
    id: 6,
    title: 'Advanced Data Science with Python',
    instructor: 'Dr. David Chen',
    rating: 4.9,
    students: 45000,
    duration: '28h 15m',
    level: 'Advanced',
    price: 99.99,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    category: 'Data Science',
    tags: ['Python', 'Machine Learning', 'Data Analysis'],
    description: 'Master data science and machine learning using Python and popular frameworks.',
    stats: {
      totalHours: 28.25,
      totalLectures: 340,
      totalQuizzes: 45,
      certificateOffered: true,
      lastUpdated: '2024-02-12',
      language: 'English',
      totalAssignments: 15,
      totalProjects: 10,
      completionRate: 70,
      avgCompletionTime: '3h 15m',
      difficulty: 5,
      successRate: 60
    },
    topics: ['Python for Data Science', 'Machine Learning', 'Deep Learning'],
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
    isBookmarked: false,
    learningOutcomes: [
      'Understand Python for data science',
      'Apply machine learning algorithms',
      'Analyze and interpret data',
      'Implement deep learning models',
      'Use popular Python libraries'
    ],
    prerequisites: ['Basic Python programming', 'Understanding of statistics'],
    instructorDetails: {
      name: 'Dr. David Chen',
      bio: 'AI Research Scientist with 15+ years experience in Machine Learning and Deep Learning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['Machine Learning', 'AI', 'Deep Learning', 'Computer Vision'],
      rating: 4.9,
      totalStudents: 45000,
      totalCourses: 6
    },
    courseProgress: {
      completed: 28,
      totalUnits: 34,
      lastAccessed: '2024-02-12'
    },
    reviews: [
      {
        rating: 5,
        comment: 'Incredible depth of content. Dr. Chen explains complex concepts clearly.',
        userName: 'Michael Zhang',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        date: '2024-02-18',
        helpful: 234
      }
    ],
    nextStartDate: '2024-03-15',
    language: 'English',
    subtitles: ['English'],
    certification: {
      type: 'Certificate of Completion',
      validityPeriod: '1 year',
      accreditedBy: 'Coursera',
      badgeUrl: 'https://example.com/data-science-certificate.jpg'
    },
    materials: [
      { type: 'Video', count: 340 },
      { type: 'Quiz', count: 45 },
      { type: 'Project', count: 10 },
      { type: 'Assignment', count: 15 }
    ],
    supportedDevices: ['Desktop', 'Mobile'],
    accessType: 'lifetime',
    validityPeriod: '1 year'
  },
  {
    id: 7,
    title: 'Arabic Calligraphy Masterclass',
    instructor: 'Fatima Al-Said',
    rating: 4.8,
    students: 25000,
    duration: '20h 15m',
    level: 'Intermediate',
    price: 79.99,
    thumbnail: 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    category: 'Personal Development',
    tags: ['Arabic Calligraphy', 'Islamic Art', 'Typography'],
    description: 'Learn the art of Arabic calligraphy and Islamic art from Fatima Al-Said.',
    stats: {
      totalHours: 20.25,
      totalLectures: 240,
      totalQuizzes: 30,
      certificateOffered: true,
      lastUpdated: '2024-02-05',
      language: 'Arabic',
      totalAssignments: 7,
      totalProjects: 4,
      completionRate: 70,
      avgCompletionTime: '2h 15m',
      difficulty: 4,
      successRate: 65
    },
    topics: ['Arabic Calligraphy Basics', 'Islamic Art', 'Typography'],
    skills: ['Arabic Calligraphy', 'Islamic Art', 'Typography'],
    isBookmarked: false,
    learningOutcomes: [
      'Understand the fundamentals of Arabic calligraphy',
      'Create beautiful Islamic art',
      'Practice and perfect your calligraphy skills',
      'Apply Islamic art principles in your work',
      'Use traditional and modern techniques'
    ],
    prerequisites: ['Basic Arabic language knowledge', 'Understanding of Islamic art'],
    instructorDetails: {
      name: 'Fatima Al-Said',
      bio: 'Master Calligrapher with 20+ years experience in traditional and modern Arabic calligraphy',
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['Arabic Calligraphy', 'Islamic Art', 'Typography'],
      rating: 4.8,
      totalStudents: 25000,
      totalCourses: 4
    },
    courseProgress: {
      completed: 20,
      totalUnits: 24,
      lastAccessed: '2024-02-05'
    },
    reviews: [
      {
        rating: 5,
        comment: 'فاطمة أستاذة رائعة، شرحها واضح وممتع. تعلمت الكثير من هذه الدورة',
        userName: 'Ahmed Hassan',
        userAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        date: '2024-02-12',
        helpful: 145
      }
    ],
    nextStartDate: '2024-03-10',
    language: 'Arabic',
    subtitles: ['Arabic'],
    certification: {
      type: 'Certificate of Completion',
      validityPeriod: '1 year',
      accreditedBy: 'Coursera',
      badgeUrl: 'https://example.com/arabic-calligraphy-certificate.jpg'
    },
    materials: [
      { type: 'Video', count: 240 },
      { type: 'Quiz', count: 30 },
      { type: 'Project', count: 4 },
      { type: 'Assignment', count: 7 }
    ],
    supportedDevices: ['Desktop', 'Mobile'],
    accessType: 'lifetime',
    validityPeriod: '1 year'
  },
  // Add more courses as needed
];

const searchBarAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState('popular');
  const [visibleCourses, setVisibleCourses] = useState<Course[]>([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);
  const enrollModalRef = useRef<HTMLDivElement>(null);

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...allCourses];

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Apply level filter
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Apply price filter
    filtered = filtered.filter(
      course => course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        course =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setVisibleCourses(filtered.slice(0, displayCount));
  }, [selectedCategory, selectedLevel, priceRange, searchQuery, sortBy, displayCount]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const loadMore = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setDisplayCount(prev => prev + 6);
    setIsLoading(false);
  };

  // Handle bookmark toggle
  const toggleBookmark = (courseId: number) => {
    setBookmarkedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Handle share
  const handleShare = async (course: Course) => {
    try {
      await navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  // Handle click outside search suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEnrollClick = (course: Course) => {
    navigate(`/checkout/${course.id}`);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (enrollModalRef.current && !enrollModalRef.current.contains(event.target as Node)) {
        setShowEnrollModal(false);
        setEnrollingCourse(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-400 text-white py-24 w-full">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10 transform rotate-3 scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          {/* Hero Text */}
          <div className="text-center transform -translate-y-4 opacity-0 animate-fade-in-down">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next Skill
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto mb-12 leading-relaxed">
              Choose from thousands of online courses with new additions published every month
            </p>
          </div>
          
          {/* Search Container */}
          <div className="relative max-w-2xl mx-auto mt-8 px-4" ref={searchContainerRef}>
            {/* Search Form */}
            <div className="relative" style={{ zIndex: 50 }}>
              <form onSubmit={handleSearch} className="animate-fade-in-up">
                <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 transition-all duration-300 hover:bg-white/15 focus-within:ring-2 focus-within:ring-white/30">
                  <div className="flex-1 flex items-center relative">
                    <div className="absolute left-6">
                      <Search className="h-5 w-5 text-white/70" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for courses..."
                      className="w-full pl-14 pr-4 py-5 bg-transparent text-white placeholder-white/70 focus:outline-none rounded-l-2xl transition-all duration-300 text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-8 py-5 bg-white text-red-600 font-medium rounded-r-2xl hover:bg-red-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600 shadow-md hover:shadow-lg text-lg"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Search Suggestions */}
            <div 
              className={`absolute left-4 right-4 mt-2 transition-all duration-300 ${
                showSuggestions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
              }`} 
              style={{ zIndex: 51 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20">
                {searchQuery && searchQuery.length > 2 && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-white/90">
                        <TrendingUp className="h-4 w-4 mr-2 animate-pulse" />
                        <span className="text-sm font-medium">Popular Searches</span>
                      </div>
                      <button 
                        onClick={() => setShowSuggestions(false)}
                        className="text-white/60 hover:text-white/90 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
                      {[
                        { text: 'React Development', icon: <div className="text-lg">⚛️</div>, count: 150, trend: '+15%' },
                        { text: 'Machine Learning', icon: <div className="text-lg">🤖</div>, count: 120, trend: '+25%' },
                        { text: 'UI/UX Design', icon: <div className="text-lg">🎨</div>, count: 95, trend: '+10%' },
                        { text: 'Python Programming', icon: <div className="text-lg">🐍</div>, count: 180, trend: '+20%' },
                        { text: 'Data Science', icon: <div className="text-lg">📊</div>, count: 135, trend: '+30%' },
                        { text: 'Web Development', icon: <div className="text-lg">🌐</div>, count: 200, trend: '+18%' }
                      ].map((item, index) => (
                        <button
                          key={index}
                          className="flex items-center justify-between w-full p-3 hover:bg-white/10 rounded-lg transition-all duration-300 group relative overflow-hidden"
                          onClick={() => {
                            setSearchQuery(item.text);
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white/90 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                                {item.text}
                              </span>
                              <span className="text-white/50 text-xs flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                                {item.trend}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end relative z-10">
                            <span className="text-xs text-white/60 group-hover:text-white/90 transition-colors duration-300">
                              {item.count} courses
                            </span>
                            <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white/90 transition-all duration-300 transform group-hover:translate-x-1" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 relative" style={{ zIndex: 49 }}>
              <button 
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                onClick={() => setSearchQuery('Programming')}
              >
                Programming
              </button>
              <button 
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                onClick={() => setSearchQuery('Design')}
              >
                Design
              </button>
              <button 
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                onClick={() => setSearchQuery('Business')}
              >
                Business
              </button>
              <button 
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                onClick={() => setSearchQuery('Data Science')}
              >
                Data Science
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 20 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Learning Hours */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                  250K+
                </div>
                <div className="text-sm text-white/80">Learning Hours</div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Course Completion */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                  85%
                </div>
                <div className="text-sm text-white/80">Completion Rate</div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-white rounded-full"></div>
            </div>
          </div>

          {/* Active Students */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                  50K+
                </div>
                <div className="text-sm text-white/80">Active Students</div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Career Growth */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                  92%
                </div>
                <div className="text-sm text-white/80">Career Growth</div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20 border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-red-500" />
                Filters
              </h2>
              
              {/* Categories with enhanced styling */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                      selectedCategory === 'All'
                        ? 'bg-red-50 text-red-600 shadow-sm'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">🎯</span>
                      <span>All Categories</span>
                    </div>
                    <span className="text-sm text-gray-400">{allCourses.length}</span>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        selectedCategory === category.name
                          ? 'bg-red-50 text-red-600 shadow-sm'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Level Filter */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Level</h3>
                <div className="grid grid-cols-1 gap-2">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        selectedLevel === level
                          ? 'bg-red-50 text-red-600 shadow-sm'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
                        ${selectedLevel === level ? 'border-red-600' : 'border-gray-300"
                      >
                        {selectedLevel === level && (
                          <span className="w-2 h-2 rounded-full bg-red-600" />
                        )}
                      </span>
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            
              {/* Enhanced Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4">Price Range</h3>
                <div className="px-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">${priceRange[0]}</span>
                    <span className="text-sm font-medium text-gray-900">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:w-3/4">
            {/* Trending Topics */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-red-500" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Python', 'Data Science', 'Machine Learning', 'UI/UX Design', 'Digital Marketing'].map((topic) => (
                  <button
                    key={topic}
                    className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Sort Controls */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-600">
                Showing <span className="font-medium text-gray-900">{visibleCourses.length}</span> of{' '}
                <span className="font-medium text-gray-900">{allCourses.length}</span> courses
              </p>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-4 pr-8 py-2 border border-gray-200 rounded-lg text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Enhanced Course Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visibleCourses.map((course) => (
                <div 
                  key={course.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 relative"
                >
                  {/* New Ribbon for Featured Courses */}
                  {course.isFeatured && (
                    <div className="absolute -right-12 top-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-1 px-12 transform rotate-45 z-20 shadow-lg">
                      <span className="text-sm font-bold">Featured</span>
                    </div>
                  )}

                  {/* Card Header with Enhanced Image */}
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Enhanced Preview Button */}
                    {course.previewVideo && (
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowPreview(true);
                        }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"
                      >
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl hover:shadow-3xl group-hover:bg-red-50">
                          <Play className="h-10 w-10 text-red-600 transform transition-transform group-hover:scale-110" />
                        </div>
                      </button>
                    )}

                    {/* Enhanced Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      {course.isFeatured && (
                        <div className="px-4 py-2 bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center transform hover:scale-105 transition-all duration-300 shadow-lg">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Featured
                        </div>
                      )}
                      {course.discount && (
                        <div className="px-4 py-2 bg-gradient-to-r from-red-500/90 to-red-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg">
                          <span className="animate-pulse">{course.discount}% OFF</span>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2 z-10">
                      <button
                        onClick={() => toggleBookmark(course.id)}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group/btn"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-colors duration-300 ${
                            bookmarkedCourses.includes(course.id) 
                              ? "text-red-600 fill-current" 
                              : "text-gray-600 group-hover/btn:text-red-600"
                          }`} 
                        />
                      </button>
                      <button
                        onClick={() => handleShare(course)}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group/share"
                      >
                        <Share2 className="h-5 w-5 text-gray-600 group-hover/share:text-blue-600" />
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Card Content */}
                  <div className="p-6">
                    {/* Category and Rating with Enhanced Styling */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 text-sm font-medium rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-md">
                        {course.category}
                      </span>
                      <div className="flex items-center bg-gradient-to-r from-yellow-50 to-yellow-100 px-3 py-2 rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-md group/rating">
                        <Star className="h-4 w-4 text-yellow-400 fill-current group-hover/rating:animate-pulse" />
                        <span className="ml-1 text-sm font-medium text-yellow-700">{course.rating}</span>
                      </div>
                    </div>

                    {/* Enhanced Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 group-hover:line-clamp-none">
                      {course.title}
                    </h3>

                    {/* Enhanced Instructor Info */}
                    <div className="flex items-center mb-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-colors duration-300 group/instructor">
                      <img
                        src={course.instructorDetails.avatar}
                        alt={course.instructorDetails.name}
                        className="w-12 h-12 rounded-full object-cover mr-3 ring-2 ring-white shadow-md group-hover/instructor:scale-110 transition-transform duration-300"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{course.instructorDetails.name}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          {course.instructorDetails.rating} • {course.instructorDetails.totalStudents.toLocaleString()} students
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Course Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                      <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300 group/stat">
                        <Clock className="h-5 w-5 text-red-500 mb-1 group-hover/stat:animate-bounce" />
                        <span className="text-sm font-medium text-gray-900">{course.duration}</span>
                        <span className="text-xs text-gray-500">Duration</span>
                      </div>
                      <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300 group/stat">
                        <Users className="h-5 w-5 text-blue-500 mb-1 group-hover/stat:animate-bounce" />
                        <span className="text-sm font-medium text-gray-900">{course.students.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">Students</span>
                      </div>
                      <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300 group/stat">
                        <BookOpen className="h-5 w-5 text-green-500 mb-1 group-hover/stat:animate-bounce" />
                        <span className="text-sm font-medium text-gray-900">{course.level}</span>
                        <span className="text-xs text-gray-500">Level</span>
                      </div>
                    </div>

                    {/* Enhanced Description */}
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 group-hover:line-clamp-none transition-all duration-500">
                      {course.description}
                    </p>

                    {/* Enhanced Skills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full transform hover:scale-105 transition-all duration-300 hover:bg-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skills && course.skills.length > 3 && (
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full transform hover:scale-105 transition-all duration-300 hover:bg-gray-200">
                          +{course.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                      <div className="flex flex-col">
                        {course.discount ? (
                          <>
                            <span className="text-2xl font-bold text-gray-900">
                              ${(course.price * (1 - course.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${course.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-gray-900">
                            ${course.price}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => handleEnrollClick(course)} 
                        className="px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Load More Button */}
            {visibleCourses.length < allCourses.length && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-8 py-4 bg-white text-red-600 font-medium rounded-xl border-2 border-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    'Load More Courses'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Course Preview Modal */}
      {selectedCourse && showPreview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center">
          <div ref={modalRef} className="bg-white rounded-2xl max-w-4xl w-full mx-4 overflow-hidden">
            {/* Video Preview Section */}
            <div className="relative aspect-video">
              <iframe
                src={selectedCourse.previewVideo}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Course Details Section */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
                <button
                  onClick={() => {
                    setSelectedCourse(null);
                    setShowPreview(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center mb-6">
                <img
                  src={selectedCourse.instructorDetails.avatar}
                  alt={selectedCourse.instructorDetails.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedCourse.instructorDetails.name}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedCourse.instructorDetails.bio}</p>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedCourse.stats.totalHours}h</div>
                  <div className="text-sm text-gray-600">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedCourse.stats.totalLectures}</div>
                  <div className="text-sm text-gray-600">Lectures</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedCourse.stats.completionRate}%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedCourse.stats.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>

              {/* Course Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">About This Course</h3>
                <p className="text-gray-600">{selectedCourse.description}</p>
              </div>

              {/* Learning Outcomes */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCourse.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Prerequisites</h3>
                <div className="space-y-2">
                  {selectedCourse.prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{prerequisite}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content Preview */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                <div className="space-y-4">
                  {selectedCourse.topics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Play className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{topic}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate Information */}
              {selectedCourse.certification && (
                <div className="mb-8 p-6 bg-blue-50 rounded-xl">
                  <div className="flex items-start">
                    <Award className="h-8 w-8 text-blue-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        {selectedCourse.certification.type}
                      </h3>
                      <p className="text-blue-700 mb-2">
                        Accredited by {selectedCourse.certification.accreditedBy}
                      </p>
                      <p className="text-sm text-blue-600">
                        Validity: {selectedCourse.certification.validityPeriod}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Preview */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Student Reviews</h3>
                <div className="space-y-4">
                  {selectedCourse.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center mb-2">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{review.userName}</div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {review.helpful} found this helpful
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ${selectedCourse.discount
                      ? (selectedCourse.price * (1 - selectedCourse.discount / 100)).toFixed(2)
                      : selectedCourse.price}
                  </div>
                  {selectedCourse.discount && (
                    <div className="text-sm text-gray-500">
                      <span className="line-through">${selectedCourse.price}</span>
                      <span className="text-red-600 ml-2">{selectedCourse.discount}% OFF</span>
                    </div>
                  )}
                </div>
                <div className="space-x-4">
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-colors duration-200">
                    Add to Cart
                  </button>
                  <button className="px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors duration-200">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Modal */}
      {showEnrollModal && enrollingCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div 
            ref={enrollModalRef}
            className="bg-white rounded-2xl max-w-2xl w-full mx-4 overflow-hidden shadow-2xl transform transition-all duration-300 animate-fade-in-up"
          >
            {/* Modal Header */}
            <div className="relative h-48 bg-gradient-to-r from-red-600 to-red-400 overflow-hidden">
              <img 
                src={enrollingCourse.thumbnail} 
                alt={enrollingCourse.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
              <div className="relative p-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{enrollingCourse.title}</h3>
                  <div className="flex items-center text-white/90">
                    <img 
                      src={enrollingCourse.instructorDetails.avatar}
                      alt={enrollingCourse.instructorDetails.name}
                      className="w-8 h-8 rounded-full mr-2 border-2 border-white/20"
                    />
                    <span>{enrollingCourse.instructorDetails.name}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEnrollModal(false)}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Course Duration</div>
                  <div className="text-lg font-semibold text-gray-900 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-red-500" />
                    {enrollingCourse.duration}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Difficulty Level</div>
                  <div className="text-lg font-semibold text-gray-900 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-red-500" />
                    {enrollingCourse.level}
                  </div>
                </div>
              </div>

              {/* What You'll Get */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What You'll Get</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { icon: <BookOpen className="h-5 w-5" />, text: `${enrollingCourse.stats.totalLectures} lectures` },
                    { icon: <Clock className="h-5 w-5" />, text: `${enrollingCourse.stats.totalHours} hours of content` },
                    { icon: <Award className="h-5 w-5" />, text: 'Certificate of completion' },
                    { icon: <Users className="h-5 w-5" />, text: 'Community access' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-700">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h4>
                <div className="space-y-3">
                  <div className="border-2 border-red-200 rounded-xl p-4 bg-red-50/50 relative">
                    <input 
                      type="radio" 
                      name="payment" 
                      id="full" 
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      defaultChecked 
                    />
                    <label htmlFor="full" className="block cursor-pointer">
                      <div className="text-lg font-semibold text-gray-900">
                        Full Payment
                      </div>
                      <div className="text-2xl font-bold text-red-600 mt-1">
                        ${enrollingCourse.price}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        One-time payment with lifetime access
                      </div>
                    </label>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-4 relative">
                    <input 
                      type="radio" 
                      name="payment" 
                      id="installment" 
                      className="absolute right-4 top-1/2 -translate-y-1/2" 
                    />
                    <label htmlFor="installment" className="block cursor-pointer">
                      <div className="text-lg font-semibold text-gray-900">
                        3 Monthly Payments
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mt-1">
                        ${(enrollingCourse.price / 3).toFixed(2)}/month
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Split into 3 easy payments
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowEnrollModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors duration-200"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;