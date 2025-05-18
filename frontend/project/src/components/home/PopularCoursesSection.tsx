import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    description: 'Master modern web development with HTML, CSS, JavaScript, React, and Node.js.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      role: 'Senior Developer'
    },
    rating: 4.9,
    students: 15000,
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    price: '$599'
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    description: 'Learn data analysis, machine learning, and statistical modeling with Python.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: 'Data Scientist'
    },
    rating: 4.8,
    students: 12000,
    duration: '10 weeks',
    level: 'Intermediate',
    price: '$499'
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass',
    description: 'Create beautiful user interfaces and enhance user experience with modern design principles.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      role: 'Design Lead'
    },
    rating: 4.7,
    students: 8000,
    duration: '8 weeks',
    level: 'All Levels',
    price: '$399'
  }
];

const PopularCoursesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-red-600 font-semibold text-sm uppercase tracking-wider"
          >
            Featured Courses
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-4xl font-bold text-gray-900"
          >
            Most Popular Courses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-600"
          >
            Start your learning journey with our top-rated courses
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-red-600 font-semibold">
                  {course.price}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{course.instructor.name}</p>
                    <p className="text-xs text-gray-600">{course.instructor.role}</p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-yellow-400 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-semibold text-gray-900">{course.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-gray-900 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="ml-1 text-sm font-semibold">{(course.students / 1000).toFixed(1)}k</span>
                    </div>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-gray-900 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="ml-1 text-sm font-semibold">{course.duration}</span>
                    </div>
                    <p className="text-xs text-gray-600">Duration</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/courses/${course.id}`}
                  className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors group"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Courses Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All Courses
            <BookOpen className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;