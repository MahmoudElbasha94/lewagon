import React from 'react';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

const FreeCourses: React.FC = () => {
  const freeCourses: Course[] = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn the basics of web development with HTML, CSS, and JavaScript.',
      duration: '6 hours',
      students: 1200,
      rating: 4.8,
      lessons: [
        {
          id: 1,
          title: 'HTML Basics',
          duration: '1 hour'
        },
        {
          id: 2,
          title: 'CSS Fundamentals',
          duration: '2 hours'
        },
        {
          id: 3,
          title: 'JavaScript Introduction',
          duration: '3 hours'
        }
      ],
      thumbnail: '/images/courses/web-dev.jpg',
      level: 'Beginner',
      price: 0,
      certification: {
        type: 'Certificate of Completion',
        validity: 'Lifetime'
      },
      instructorDetails: {
        name: 'John Doe',
        avatar: '/images/instructors/john-doe.jpg',
        expertise: ['Web Development', 'Frontend Development']
      }
    },
    // Add more free courses as needed
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Free Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{course.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>
                <Link
                  to={`/courses/detail?id=${course.id}`}
                  className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeCourses; 