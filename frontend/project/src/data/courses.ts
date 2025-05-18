import { Course } from '../types/Course';

const courseData: Course[] = [
  {
    id: 1,
    title: 'Complete React Developer Course',
    description: 'Master React 18 with Redux, Hooks, and all the modern tools and best practices used by top companies.',
    price: 89.99,
    duration: '22h 30m',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    discount: 20,
    certification: {
      type: 'Professional Certificate',
      validity: 'Lifetime'
    },
    instructorDetails: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['React', 'JavaScript', 'Frontend Architecture']
    },
    lessons: [
      { id: 1, title: 'Introduction to React', duration: '45m' },
      { id: 2, title: 'React Hooks', duration: '1h 30m' },
      { id: 3, title: 'State Management', duration: '2h' }
    ]
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    description: 'Learn UI/UX design from scratch with industry best practices and modern tools.',
    price: 79.99,
    duration: '18h 45m',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    certification: {
      type: 'Design Certificate',
      validity: 'Lifetime'
    },
    instructorDetails: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['UI Design', 'UX Design', 'Figma']
    },
    lessons: [
      { id: 1, title: 'Design Fundamentals', duration: '1h' },
      { id: 2, title: 'User Research', duration: '1h 15m' },
      { id: 3, title: 'Prototyping', duration: '2h' }
    ]
  },
  {
    id: 3,
    title: 'Advanced JavaScript Programming',
    description: 'Take your JavaScript skills to the next level with advanced concepts and patterns.',
    price: 94.99,
    duration: '25h',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    discount: 15,
    certification: {
      type: 'Advanced Certificate',
      validity: 'Lifetime'
    },
    instructorDetails: {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      expertise: ['JavaScript', 'TypeScript', 'Node.js']
    },
    lessons: [
      { id: 1, title: 'Advanced Functions', duration: '2h' },
      { id: 2, title: 'Design Patterns', duration: '3h' },
      { id: 3, title: 'Performance Optimization', duration: '2h 30m' }
    ]
  }
];

export default courseData;