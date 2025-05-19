import { Course } from '../types/Course';

const courseData: Course[] = [
  {
    id: "1",
    title: 'Complete React Developer Course',
    description: 'Master React 18 with Redux, Hooks, and all the modern tools and best practices used by top companies.',
    price: 89.99,
    duration: '22h 30m',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    previewVideo: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    discount: 20,
    stats: {
      totalHours: 22.5,
      totalLectures: 48,
      totalQuizzes: 12,
      certificateOffered: true,
      lastUpdated: '2024-03-15',
      language: 'English',
      totalAssignments: 15,
      totalProjects: 3,
      completionRate: 85,
      avgCompletionTime: '3 months',
      difficulty: 2,
      successRate: 92
    },
    certification: {
      type: 'Professional Certificate',
      validity: 'Lifetime'
    },
    instructorDetails: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['React', 'JavaScript', 'Frontend Architecture']
    },
    sections: [
      {
        id: 's1',
        title: 'Getting Started with React',
        description: 'Introduction to React fundamentals',
        order: 1,
        lessons: [
          { 
            id: 'l1', 
            title: 'Introduction to React',
            description: 'Learn the basics of React and its core concepts',
            duration: '45m',
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
            uploadStatus: 'completed'
          },
          { 
            id: 'l2', 
            title: 'React Hooks',
            description: 'Understanding React Hooks and their usage',
            duration: '1h 30m',
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
            uploadStatus: 'completed'
          },
          { 
            id: 'l3', 
            title: 'State Management',
            description: 'Managing state in React applications',
            duration: '2h',
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
            uploadStatus: 'completed'
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: 'UI/UX Design Masterclass',
    description: 'Learn UI/UX design from scratch with industry best practices and modern tools.',
    price: 79.99,
    duration: '18h 45m',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    previewVideo: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    stats: {
      totalHours: 18.75,
      totalLectures: 35,
      totalQuizzes: 8,
      certificateOffered: true,
      lastUpdated: '2024-03-10',
      language: 'English',
      totalAssignments: 12,
      totalProjects: 4,
      completionRate: 90,
      avgCompletionTime: '2.5 months',
      difficulty: 1,
      successRate: 95
    },
    certification: {
      type: 'Design Certificate',
      validity: 'Lifetime'
    },
    instructorDetails: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['UI Design', 'UX Design', 'Figma']
    },
    sections: [
      {
        id: 's1',
        title: 'Design Fundamentals',
        description: 'Learn the basics of UI/UX design',
        order: 1,
        lessons: [
          { 
            id: 'l1', 
            title: 'Design Fundamentals',
            description: 'Understanding the basics of design',
            duration: '1h',
            videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
            uploadStatus: 'completed'
          },
          { 
            id: 'l2', 
            title: 'User Research',
            description: 'Learn how to conduct effective user research',
            duration: '1h 15m',
            videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
            uploadStatus: 'completed'
          },
          { 
            id: 'l3', 
            title: 'Prototyping',
            description: 'Create interactive prototypes',
            duration: '2h',
            videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
            uploadStatus: 'completed'
          }
        ]
      }
    ]
  },
  {
    id: "3",
    title: 'Advanced JavaScript Programming',
    description: 'Take your JavaScript skills to the next level with advanced concepts and patterns.',
    price: 94.99,
    duration: '25h',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    previewVideo: 'https://www.youtube.com/embed/jS4aFq5-91M',
    discount: 15,
    stats: {
      totalHours: 25,
      totalLectures: 52,
      totalQuizzes: 15,
      certificateOffered: true,
      lastUpdated: '2024-03-20',
      language: 'English',
      totalAssignments: 20,
      totalProjects: 5,
      completionRate: 80,
      avgCompletionTime: '4 months',
      difficulty: 3,
      successRate: 88
    },
    certification: {
      type: 'Advanced Certificate',
      validity: 'Lifetime'
    },
    instructorDetails: {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['JavaScript', 'TypeScript', 'Node.js']
    },
    sections: [
      {
        id: 's1',
        title: 'Advanced JavaScript Concepts',
        description: 'Master advanced JavaScript programming concepts',
        order: 1,
        lessons: [
          { 
            id: 'l1', 
            title: 'Advanced Functions',
            description: 'Deep dive into JavaScript functions and advanced patterns',
            duration: '2h',
            videoUrl: 'https://www.youtube.com/embed/jS4aFq5-91M',
            uploadStatus: 'completed'
          },
          { 
            id: 'l2', 
            title: 'Design Patterns',
            description: 'Common JavaScript design patterns and their implementations',
            duration: '3h',
            videoUrl: 'https://www.youtube.com/embed/jS4aFq5-91M',
            uploadStatus: 'completed'
          },
          { 
            id: 'l3', 
            title: 'Performance Optimization',
            description: 'Techniques for optimizing JavaScript performance',
            duration: '2h 30m',
            videoUrl: 'https://www.youtube.com/embed/jS4aFq5-91M',
            uploadStatus: 'completed'
          }
        ]
      }
    ]
  }
];

export default courseData;