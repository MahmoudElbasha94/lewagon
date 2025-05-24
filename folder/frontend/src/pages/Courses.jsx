import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { name: 'Programming', icon: '💻', count: 150 },
    { name: 'Design', icon: '🎨', count: 89 },
    { name: 'Business', icon: '💼', count: 120 },
    { name: 'Marketing', icon: '📊', count: 95 },
    { name: 'Photography', icon: '📸', count: 75 },
    { name: 'Music', icon: '🎵', count: 60 },
    { name: 'Data Science', icon: '📊', count: 110 },
    { name: 'Personal Development', icon: '🎯', count: 85 },
  ];

  const courses = [
    {
      id: 1,
      slug: 'web-development-bootcamp',
      title: 'Web Development Bootcamp',
      description: 'Learn web development from scratch with HTML, CSS, JavaScript, and React.',
      price: 99.99,
      duration: '12 weeks',
      level: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
      },
      rating: 4.8,
      students: 1200
    },
    {
      id: 2,
      slug: 'data-science-masterclass',
      title: 'Data Science Masterclass',
      description: 'Master data science with Python, Machine Learning, and AI.',
      price: 149.99,
      duration: '16 weeks',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
      },
      rating: 4.9,
      students: 850
    },
    {
      id: 3,
      slug: 'ui-ux-design-fundamentals',
      title: 'UI/UX Design Fundamentals',
      description: 'Learn UI/UX design principles and tools like Figma.',
      price: 79.99,
      duration: '8 weeks',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
      },
      rating: 4.7,
      students: 650
    },
    {
      id: 4,
      slug: 'digital-marketing-strategy',
      title: 'Digital Marketing Strategy',
      description: 'Learn modern digital marketing techniques and strategies.',
      price: 89.99,
      duration: '10 weeks',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
      },
      rating: 4.6,
      students: 920
    },
    {
      id: 5,
      slug: 'mobile-app-development',
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps using React Native.',
      price: 129.99,
      duration: '14 weeks',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
      },
      rating: 4.9,
      students: 780
    },
    {
      id: 6,
      slug: 'business-analytics',
      title: 'Business Analytics',
      description: 'Master data analysis and business intelligence tools.',
      price: 109.99,
      duration: '12 weeks',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'Emily Brown',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
      },
      rating: 4.7,
      students: 550
    }
  ];

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="display-4 fw-bold mb-4">Explore Our Courses</h1>
        <p className="lead text-gray-600 mb-6">
          Discover a wide range of courses taught by industry experts
        </p>
        
        {/* Search Bar */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-red">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Categories</h5>
              <div className="d-flex flex-column gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`btn text-start d-flex justify-content-between align-items-center ${
                      selectedCategory === category.name ? 'btn-red' : 'btn-link text-dark'
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span>
                      <span className="me-2">{category.icon}</span>
                      {category.name}
                    </span>
                    <span className="badge bg-gray-200 text-dark rounded-pill">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <hr className="my-4" />

              <h5 className="card-title mb-4">Level</h5>
              <div className="d-flex flex-column gap-2">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <button
                    key={level}
                    className={`btn text-start ${
                      selectedLevel === level ? 'btn-red' : 'btn-link text-dark'
                    }`}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="col-lg-9">
          {/* Sort Controls */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="mb-0">
              Showing {courses.length} courses
            </p>
            <select
              className="form-select w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Course Cards */}
          <div className="row g-4">
            {courses.map((course) => (
              <div key={course.id} className="col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all">
                  <img
                    src={course.thumbnail}
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text text-gray-600">{course.description}</p>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="rounded-circle me-2"
                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                      />
                      <span className="text-gray-600">{course.instructor.name}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span className="text-gray-600">{course.rating}</span>
                        <span className="text-gray-400 ms-2">({course.students} students)</span>
                      </div>
                      <span className="h5 mb-0">${course.price}</span>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-0">
                    <Link to={`/courses/${course.slug}`} className="btn btn-red w-100">
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses; 