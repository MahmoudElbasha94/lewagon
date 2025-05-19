import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/common/PageTransition';
import { Plus, Search, Edit2, Trash2, Users, Star, BarChart2, Eye, EyeOff, Clock } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  status: 'draft' | 'published' | 'archived';
  students: number;
  rating: number;
  totalRevenue: number;
  lastUpdated: string;
  progress: number;
}

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');

  useEffect(() => {
    // TODO: Fetch real courses data from API
    setCourses([
      {
        id: '1',
        title: 'React Fundamentals',
        thumbnail: 'https://placehold.co/400x225',
        price: 99.99,
        status: 'published',
        students: 156,
        rating: 4.8,
        totalRevenue: 15599.84,
        lastUpdated: '2024-03-15',
        progress: 100
      },
      {
        id: '2',
        title: 'Advanced TypeScript Development',
        thumbnail: 'https://placehold.co/400x225',
        price: 129.99,
        status: 'published',
        students: 89,
        rating: 4.6,
        totalRevenue: 11569.11,
        lastUpdated: '2024-03-10',
        progress: 100
      },
      {
        id: '3',
        title: 'Node.js API Development',
        thumbnail: 'https://placehold.co/400x225',
        price: 149.99,
        status: 'draft',
        students: 0,
        rating: 0,
        totalRevenue: 0,
        lastUpdated: '2024-03-18',
        progress: 75
      }
    ]);
  }, []);

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      // TODO: Send delete request to API
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handleStatusChange = (courseId: string, newStatus: Course['status']) => {
    // TODO: Send status update to API
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, status: newStatus } : course
    ));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalStats = () => {
    return {
      totalStudents: courses.reduce((acc, course) => acc + course.students, 0),
      totalRevenue: courses.reduce((acc, course) => acc + course.totalRevenue, 0),
      averageRating: courses.filter(c => c.rating > 0).reduce((acc, course) => acc + course.rating, 0) / 
                    courses.filter(c => c.rating > 0).length || 0
    };
  };

  const stats = getTotalStats();

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your courses and track their performance
            </p>
          </div>
          <button
            onClick={() => navigate('/instructor/courses/new')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Course
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-10 h-10 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart2 className="w-10 h-10 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Star className="w-10 h-10 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Rating</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.averageRating.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Courses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-start">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {course.title}
                        </h3>
                        <div className="mt-1 flex items-center">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            Last updated {new Date(course.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/instructor/courses/${course.id}`)}
                          className="p-2 text-gray-400 hover:text-blue-500"
                          title="Edit course"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                          title="Delete course"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          ${course.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Students</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {course.students}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Rating</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900 flex items-center">
                          {course.rating > 0 ? (
                            <>
                              {course.rating}
                              <Star className="w-4 h-4 text-yellow-400 ml-1" />
                            </>
                          ) : (
                            'N/A'
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Revenue</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          ${course.totalRevenue.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {course.status === 'draft' && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Course completion: {course.progress}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {course.status !== 'draft' && (
                  <div className="mt-4 pt-4 border-t flex justify-end space-x-4">
                    {course.status === 'published' ? (
                      <button
                        onClick={() => handleStatusChange(course.id, 'archived')}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                      >
                        <EyeOff className="w-4 h-4 mr-2" />
                        Archive Course
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(course.id, 'published')}
                        className="flex items-center text-blue-500 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Publish Course
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No courses found</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Courses; 