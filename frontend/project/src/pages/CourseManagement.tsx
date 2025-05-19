import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Book,
  Video,
  File,
  Edit,
  Trash2,
  Plus,
  GripHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CourseSection, CourseLessonDraft } from '../types/instructor';
import VideoUploader from '../components/VideoUploader';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  status: 'draft' | 'published' | 'archived';
  price: number;
  sections: CourseSection[];
  lastUpdated: string;
  studentsCount: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Web Development',
    subtitle: 'Master modern web technologies',
    description: 'A comprehensive course on modern web development...',
    coverImage: 'https://example.com/course1.jpg',
    status: 'published',
    price: 99.99,
    sections: [
      {
        id: 's1',
        title: 'Introduction',
        description: 'Course overview and setup',
        order: 1,
        lessons: [
          {
            id: 'l1',
            title: 'Welcome to the Course',
            description: 'Course introduction and overview',
            duration: '5:00',
            order: 1,
            videoUrl: 'https://example.com/video1.mp4',
            uploadStatus: 'completed',
            resources: [],
          },
        ],
      },
    ],
    lastUpdated: '2024-03-15T10:30:00Z',
    studentsCount: 250,
  },
];

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        // Replace with actual API call
        // await fetch(`/api/courses/${courseId}`, {
        //   method: 'DELETE',
        // });
        setCourses(prev => prev.filter(course => course.id !== courseId));
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  const handleAddSection = (courseId: string) => {
    const newSection: CourseSection = {
      id: `s${Date.now()}`,
      title: 'New Section',
      description: 'Section description',
      order: courses.find(c => c.id === courseId)?.sections.length || 0 + 1,
      lessons: [],
    };

    setCourses(prev =>
      prev.map(course =>
        course.id === courseId
          ? { ...course, sections: [...course.sections, newSection] }
          : course
      )
    );
  };

  const handleAddLesson = (courseId: string, sectionId: string) => {
    const newLesson: CourseLessonDraft = {
      id: `l${Date.now()}`,
      title: 'New Lesson',
      description: 'Lesson description',
      duration: '0:00',
      order:
        courses
          .find(c => c.id === courseId)
          ?.sections.find(s => s.id === sectionId)?.lessons.length || 0 + 1,
      uploadStatus: 'pending',
      resources: [],
    };

    setCourses(prev =>
      prev.map(course =>
        course.id === courseId
          ? {
              ...course,
              sections: course.sections.map(section =>
                section.id === sectionId
                  ? { ...section, lessons: [...section.lessons, newLesson] }
                  : section
              ),
            }
          : course
      )
    );
  };

  const handleVideoUpload = (courseId: string, sectionId: string, lessonId: string, videoUrl: string) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === courseId
          ? {
              ...course,
              sections: course.sections.map(section =>
                section.id === sectionId
                  ? {
                      ...section,
                      lessons: section.lessons.map(lesson =>
                        lesson.id === lessonId
                          ? { ...lesson, videoUrl, uploadStatus: 'completed' }
                          : lesson
                      ),
                    }
                  : section
              ),
            }
          : course
      )
    );
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <button
            onClick={() => {/* Handle new course creation */}}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2 inline-block" />
            Create New Course
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-8">
          {(['all', 'published', 'draft', 'archived'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {filteredCourses.map(course => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm"
            >
              {/* Course Header */}
              <div className="p-6 flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
                    <p className="text-gray-600 mt-1">{course.subtitle}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-500">
                        {course.studentsCount} students
                      </span>
                      <span className="text-sm text-gray-500">
                        Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : course.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {/* Handle course edit */}}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    {expandedCourse === course.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Course Content */}
              {expandedCourse === course.id && (
                <div className="border-t border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Course Content</h3>
                    <button
                      onClick={() => handleAddSection(course.id)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4 inline-block mr-1" />
                      Add Section
                    </button>
                  </div>

                  {/* Sections */}
                  <div className="space-y-4">
                    {course.sections.map(section => (
                      <div key={section.id} className="border border-gray-200 rounded-lg">
                        <div
                          className="p-4 flex items-center justify-between cursor-pointer"
                          onClick={() =>
                            setExpandedSection(expandedSection === section.id ? null : section.id)
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <GripHorizontal className="w-5 h-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">{section.title}</h4>
                            <span className="text-sm text-gray-500">
                              ({section.lessons.length} lessons)
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleAddLesson(course.id, section.id);
                              }}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                              <Edit className="w-4 h-4" />
                            </button>
                            {expandedSection === section.id ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>

                        {/* Lessons */}
                        {expandedSection === section.id && (
                          <div className="border-t border-gray-200 p-4 space-y-4">
                            {section.lessons.map(lesson => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center space-x-3">
                                  <GripHorizontal className="w-5 h-5 text-gray-400" />
                                  <Video className="w-5 h-5 text-gray-500" />
                                  <div>
                                    <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                                    <p className="text-sm text-gray-500">{lesson.duration}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {!lesson.videoUrl && (
                                    <VideoUploader
                                      onUploadComplete={url =>
                                        handleVideoUpload(course.id, section.id, lesson.id, url)
                                      }
                                      onUploadError={error => console.error(error)}
                                    />
                                  )}
                                  <button className="p-1 text-gray-500 hover:text-gray-700">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="p-1 text-gray-500 hover:text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseManagement; 