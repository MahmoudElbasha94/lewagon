import React from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

// Types
interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Module {
  id: number;
  title: string;
  lessons: {
    id: number;
    title: string;
    duration: string;
  }[];
}

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  instructor: string;
  duration: string;
  modules: Module[];
  reviews: Review[];
  rating: number;
  studentsCount: number;
}

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  
  // This is mock data - replace with actual API call
  const courseData: CourseDetails = {
    id: "1",
    title: "Advanced Web Development",
    description: "A comprehensive course covering modern web development technologies and best practices. Learn to build scalable, responsive web applications using the latest tools and frameworks.",
    coverImage: "/path-to-cover-image.jpg",
    price: 199,
    instructor: "John Smith",
    duration: "10 hours",
    modules: [
      {
        id: 1,
        title: "Module 1: Introduction to Modern Web Development",
        lessons: [
          { id: 1, title: "Getting Started with React", duration: "45 minutes" },
          { id: 2, title: "Understanding TypeScript", duration: "30 minutes" },
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        userName: "Alex Johnson",
        rating: 5,
        comment: "Excellent course with great practical examples",
        date: "2024-03-15"
      }
    ],
    rating: 4.8,
    studentsCount: 1250
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="relative h-64">
          <img
            src={courseData.coverImage}
            alt={courseData.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
          <div className="flex items-center mb-4">
            <Rating value={courseData.rating} readOnly precision={0.5} />
            <span className="ml-2">{courseData.rating}</span>
            <span className="text-gray-600">({courseData.studentsCount} students)</span>
          </div>
          <p className="text-gray-600 mb-4">By: {courseData.instructor}</p>
          <p className="text-gray-700">{courseData.description}</p>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <div className="space-y-4">
          {courseData.modules.map((module) => (
            <div key={module.id} className="border rounded-lg p-4">
              <h3 className="font-bold mb-3">{module.title}</h3>
              <ul className="space-y-2">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex justify-between items-center">
                    <span>{lesson.title}</span>
                    <span className="text-gray-600">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
        <div className="space-y-4">
          {courseData.reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <span className="font-bold mr-2">{review.userName}</span>
                <Rating value={review.rating} readOnly size="small" />
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-gray-500 text-sm mt-2">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 sticky bottom-0">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">${courseData.price}</span>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 