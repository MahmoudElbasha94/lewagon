import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, Users, Star, ChevronDown, Bookmark, BookOpen, Sparkles, TrendingUp, Award, Heart, Share2, Play, X, CheckCircle, ArrowRight, ThumbsUp, ChevronRight, GraduationCap } from 'lucide-react';
import { useCourses } from '../contexts/CourseContext';
import type { Course } from '../types/Course';

interface Category {
  name: string;
  icon: string;
  count: number;
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

const searchBarAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { courses, loading } = useCourses();
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

  // TODO: في Django، سيتم استخدام:
  // 1. Django Class-Based Views بدلاً من Courses List
  // 2. Django Templates بدلاً من Courses UI
  // 3. Django ORM بدلاً من Courses Data
  // 4. Django Filter بدلاً من Courses Filtering
  // 5. Django Pagination بدلاً من List Pagination

  // Filter and sort courses
  useEffect(() => {
    if (!courses || courses.length === 0) return;
    
    let filtered = [...courses] as Course[];

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
          course.instructorDetails.name.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => ((b.students || 0) - (a.students || 0)));
        break;
      case 'newest':
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setVisibleCourses(filtered.slice(0, displayCount));
  }, [selectedCategory, selectedLevel, priceRange, searchQuery, sortBy, displayCount, courses]);

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
  const toggleBookmark = (courseId: string | number) => {
    setBookmarkedCourses(prev => 
      prev.includes(Number(courseId)) 
        ? prev.filter(id => id !== Number(courseId))
        : [...prev, Number(courseId)]
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
    navigate(`/courses/${course.id}`);
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
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Search Section */}
          <div className="bg-gradient-to-r from-red-600 to-red-400 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-4xl font-bold text-center mb-8">
                Discover Your Next Skill
              </h1>
              <div className="max-w-2xl mx-auto">
                <div ref={searchContainerRef} className="relative">
                  <form onSubmit={handleSearch} className="relative">
                    <div className="relative flex items-center">
                      <Search className="absolute left-4 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search for courses..."
                        className="w-full pl-12 pr-20 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Search
                      </button>
                    </div>
                  </form>

                  {/* Search Suggestions */}
                  {showSuggestions && searchQuery && (
                    <div className="absolute w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">
                          Popular Searches
                        </h3>
                        <div className="space-y-2">
                          {categories.slice(0, 4).map((category) => (
                            <button
                              key={category.name}
                              onClick={() => {
                                setSearchQuery(category.name);
                                setSelectedCategory(category.name);
                                setShowSuggestions(false);
                              }}
                              className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                            >
                              <Search size={16} className="mr-2" />
                              <span>{category.name} Courses</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Filters */}
                      <div className="border-t border-gray-100 bg-gray-50 p-4">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">
                          Quick Filters
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {['Beginner Friendly', 'Most Popular', 'New Releases', 'Top Rated'].map((filter) => (
                            <button
                              key={filter}
                              onClick={() => {
                                setSearchQuery(filter);
                                setShowSuggestions(false);
                              }}
                              className="px-3 py-1 text-sm bg-white text-gray-600 rounded-full border border-gray-200 hover:border-red-500 hover:text-red-600 transition-colors"
                            >
                              {filter}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Matching Courses */}
                      {visibleCourses.length > 0 && (
                        <div className="border-t border-gray-100 p-4">
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">
                            Matching Courses
                          </h3>
                          <div className="space-y-2">
                            {visibleCourses.slice(0, 3).map((course) => (
                              <button
                                key={course.id}
                                onClick={() => {
                                  handleEnrollClick(course);
                                  setShowSuggestions(false);
                                }}
                                className="flex items-center w-full px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="w-10 h-10 rounded object-cover mr-3"
                                />
                                <div className="text-left">
                                  <p className="text-sm font-medium text-gray-900">{course.title}</p>
                                  <p className="text-xs text-gray-500">
                                    by {course.instructorDetails.name}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-6">Filters</h2>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-4">Categories</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className={`w-full text-left px-4 py-2 rounded ${
                          selectedCategory === 'All'
                            ? 'bg-red-50 text-red-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full text-left px-4 py-2 rounded ${
                            selectedCategory === category.name
                              ? 'bg-red-50 text-red-600'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {category.icon} {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Level */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-4">Level</h3>
                    <div className="space-y-2">
                      {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={`w-full text-left px-4 py-2 rounded ${
                            selectedLevel === level
                              ? 'bg-red-50 text-red-600'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-4">Price Range</h3>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Grid */}
              <div className="lg:w-3/4">
                {/* Sort Controls */}
                <div className="flex justify-between items-center mb-6">
                  <p>
                    Showing {visibleCourses.length} of {courses.length} courses
                  </p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {visibleCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="relative aspect-video mb-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={course.instructorDetails.avatar}
                            alt={course.instructorDetails.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <span className="text-sm text-gray-600">
                            {course.instructorDetails.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {course.rating || 0}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <span className="text-lg font-bold">${course.price}</span>
                        <button
                          onClick={() => handleEnrollClick(course)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                {visibleCourses.length < courses.length && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setDisplayCount(prev => prev + 6)}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;