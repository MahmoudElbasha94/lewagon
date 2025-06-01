import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaClock, FaLevelUpAlt, FaStar, FaUsers, FaCode, FaPalette, 
  FaChartBar, FaBriefcase, FaDatabase, FaGraduationCap, FaHeart, FaThList, 
  FaThLarge, FaFilter, FaTimes, FaPlay, FaCertificate, FaTag, FaGift,
  FaChalkboardTeacher, FaUserGraduate, FaAward, FaRegBookmark, FaBookmark } from 'react-icons/fa'
import axios from 'axios'
import './CoursesPage.css'

function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [featuredCourses, setFeaturedCourses] = useState([])
  const [recommendedCourses, setRecommendedCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [activeDeals, setActiveDeals] = useState([])
  const [learningPaths, setLearningPaths] = useState([])
  const [showQuickPreview, setShowQuickPreview] = useState(null)
  const defaultImage = '/images/course-placeholder.jpg';

  useEffect(() => {
    // Load favorites and bookmarks from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('courseFavorites') || '[]')
    const savedBookmarks = JSON.parse(localStorage.getItem('courseBookmarks') || '[]')
    const savedViewMode = localStorage.getItem('courseViewMode') || 'grid'
    setFavorites(savedFavorites)
    setBookmarks(savedBookmarks)
    setViewMode(savedViewMode)
  }, [])

  useEffect(() => {
    const fetchFeaturedAndDeals = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json'
        };

        const [dealsResponse, pathsResponse] = await Promise.all([
          axios.get('http://localhost:8000/courses/api/deals/', { headers }),
          axios.get('http://localhost:8000/courses/api/learning-paths/', { headers })
        ]);

        if (dealsResponse.data?.deals) {
          setActiveDeals(dealsResponse.data.deals);
        }
        if (pathsResponse.data?.paths) {
          setLearningPaths(pathsResponse.data.paths);
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        setActiveDeals([]);
        setLearningPaths([]);
      }
    };

    fetchFeaturedAndDeals();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('access')
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }

        const params = new URLSearchParams()
        if (searchTerm) params.append('search', searchTerm)
        if (selectedCategory !== 'All') params.append('category', selectedCategory)
        if (selectedLevel !== 'All') params.append('level', selectedLevel)

        const response = await axios.get(`http://127.0.0.1:8000/courses/api/courses/?${params.toString()}`, { headers })
        setCourses(response.data.courses || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to load courses. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [searchTerm, selectedCategory, selectedLevel])

  const categories = [
    'All',
    'Programming',
    'Design',
    'Marketing',
    'Business',
    'Data Science',
  ]

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const toggleFavorite = (courseId) => {
    const newFavorites = favorites.includes(courseId)
      ? favorites.filter(id => id !== courseId)
      : [...favorites, courseId]
    setFavorites(newFavorites)
    localStorage.setItem('courseFavorites', JSON.stringify(newFavorites))
  }

  const toggleBookmark = (courseId) => {
    const newBookmarks = bookmarks.includes(courseId)
      ? bookmarks.filter(id => id !== courseId)
      : [...bookmarks, courseId]
    setBookmarks(newBookmarks)
    localStorage.setItem('courseBookmarks', JSON.stringify(newBookmarks))
  }

  const getImageUrl = (course) => {
    if (!course.courseImage) {
      return defaultImage;
    }
    return course.courseImage.startsWith('http') ? course.courseImage : `http://127.0.0.1:8000${course.courseImage}`
  }

  const renderQuickPreview = (course) => {
    if (!showQuickPreview || showQuickPreview !== course.id) return null

    return (
      <div className="quick-preview-overlay" onClick={() => setShowQuickPreview(null)}>
        <div className="quick-preview-content" onClick={e => e.stopPropagation()}>
          <button className="close-preview" onClick={() => setShowQuickPreview(null)}>
            <FaTimes />
          </button>
          <div className="preview-header">
            <img src={getImageUrl(course)} alt={course.title} />
            <div className="preview-info">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="preview-stats">
                <span><FaUserGraduate /> {course.enrolled_students} students</span>
                <span><FaStar /> {course.rating} ({course.reviews_count} reviews)</span>
                <span><FaClock /> {course.duration} hours</span>
              </div>
            </div>
          </div>
          <div className="preview-features">
            <h4>What you'll learn</h4>
            <ul>
              {course.learning_objectives?.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
          <div className="preview-footer">
            <div className="preview-price">
              {course.original_price > course.price && (
                <span className="original-price">${course.original_price}</span>
              )}
              <span className="current-price">${course.price}</span>
            </div>
            <Link to={`/courses/${course.slug}`} className="btn btn-danger">
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const renderCourseCard = (course, isFeatured = false) => {
    const isFavorite = favorites.includes(course.id)
    const isBookmarked = bookmarks.includes(course.id)
    const hasDiscount = course.original_price > course.price
    
    return (
      <>
        <div className={`card h-100 border-0 shadow-sm hover-shadow transition ${viewMode === 'list' ? 'flex-row' : ''} ${isFeatured ? 'featured-card' : ''}`}>
          <div className={`position-relative ${viewMode === 'list' ? 'w-25' : ''}`}>
            <img
              src={getImageUrl(course)}
              alt={course.title}
              className="card-img-top"
              style={{ height: viewMode === 'list' ? '100%' : '200px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
            <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
              {isFeatured && (
                <span className="badge bg-warning">
                  <FaAward /> Featured
                </span>
              )}
              <span className="badge bg-danger">
                {course.category}
              </span>
              {hasDiscount && (
                <span className="badge bg-success">
                  <FaTag /> Sale
                </span>
              )}
            </div>
            <button 
              className="btn btn-light btn-sm position-absolute bottom-0 end-0 m-2"
              onClick={() => setShowQuickPreview(course.id)}
            >
              <FaPlay /> Preview
            </button>
          </div>

          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title mb-0">{course.title}</h5>
              <div className="d-flex gap-2">
                <button 
                  className={`btn btn-sm ${isBookmarked ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    toggleBookmark(course.id)
                  }}
                >
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                <button 
                  className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(course.id)
                  }}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
            
            <p className="card-text text-muted mb-3">
              {course.description?.substring(0, viewMode === 'list' ? 150 : 80)}...
            </p>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <span className="text-warning">
                  <FaStar />
                </span>
                <span className="fw-bold">
                  {course.rating || 4.5}
                </span>
                <span className="text-muted">
                  ({course.reviews_count || 0})
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaUsers className="text-muted" />
                <span className="text-muted">
                  {course.enrolled_students || 0} students
                </span>
              </div>
            </div>

            <div className="instructor-info mb-3">
              <div className="d-flex align-items-center gap-2">
                <FaChalkboardTeacher className="text-muted" />
                <span>{course.instructor_name}</span>
              </div>
            </div>

            <div className="d-flex gap-3 mb-3">
              <small className="text-muted d-flex align-items-center gap-1">
                <FaClock />
                {course.duration} hours
              </small>
              <small className="text-muted d-flex align-items-center gap-1">
                <FaLevelUpAlt />
                {course.level}
              </small>
              {course.certificate_available && (
                <small className="text-muted d-flex align-items-center gap-1">
                  <FaCertificate />
                  Certificate
                </small>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="price-section">
                {hasDiscount && (
                  <span className="original-price text-muted text-decoration-line-through me-2">
                    ${course.original_price}
                  </span>
                )}
                <span className="h5 text-danger mb-0">${course.price}</span>
              </div>
              <Link 
                to={`/courses/${course.slug}`} 
                className="btn btn-danger"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
        {renderQuickPreview(course)}
      </>
    )
  }

  const renderLearningPaths = () => {
    if (!learningPaths.length) return null

    return (
      <div className="learning-paths-section">
        <h3>Learning Paths</h3>
        <div className="paths-container">
          {learningPaths.map((path) => (
            <div key={`path-${path.category}`} className="path-card">
              <h4>{path.category}</h4>
              <div className="courses-list">
                {path.courses.map((course) => (
                  <div key={`path-course-${course.id}`} className="course-item">
                    <span className="course-title">{course.title}</span>
                    <span className="course-level">{course.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderActiveDeals = () => {
    if (!activeDeals.length) return null

    return (
      <div className="deals-section mb-5">
        <h3 className="section-title mb-4">
          <FaGift className="text-success me-2" />
          Limited Time Offers
        </h3>
        <div className="row g-4">
          {activeDeals.map(deal => (
            <div key={deal.id} className="col-12 col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm hover-shadow transition deal-card">
                <div className="card-body">
                  <div className="discount-badge">
                    {deal.discount_percentage}% OFF
                  </div>
                  <h5 className="card-title">{deal.title}</h5>
                  <p className="text-muted">{deal.description}</p>
                  <div className="countdown-timer">
                    Ends in: {deal.time_remaining}
                  </div>
                  <Link to={deal.course_slug} className="btn btn-success w-100">
                    Claim Deal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section with Search */}
      <div className="bg-danger py-5 text-white hero-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-8">
              <h1 className="display-4 mb-3">Discover Your Next Skill</h1>
              <p className="lead mb-4">Choose from {courses.length}+ courses and start learning today</p>
              <div className="position-relative">
                <div className="input-group input-group-lg shadow">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search for courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-dark px-4">
                    <FaSearch />
                  </button>
                </div>
                {searchSuggestions.length > 0 && (
                  <div className="search-suggestions">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="suggestion-item"
                        onClick={() => {
                          setSearchTerm(suggestion)
                          setSearchSuggestions([])
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Learning Paths Section */}
        {renderLearningPaths()}

        {/* Active Deals Section */}
        {renderActiveDeals()}

        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Filters</h5>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      setSelectedCategory('All')
                      setSelectedLevel('All')
                      setSelectedSubCategories([])
                      setPriceRange({ min: 0, max: 1000 })
                    }}
                  >
                    <FaTimes /> Reset
                  </button>
                </div>
                <hr />

                <h6 className="text-muted mb-3">Price Range</h6>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                  />
                </div>

                <h6 className="text-muted mb-3">Categories</h6>
                <div className="d-flex flex-column gap-2">
                  {categories.map(({ name, icon: Icon }) => (
                    <div key={name}>
                      <button
                        className={`btn d-flex align-items-center gap-2 w-100 ${
                          selectedCategory === name ? 'btn-danger text-white' : 'btn-outline-danger'
                        }`}
                        onClick={() => setSelectedCategory(name)}
                      >
                        <Icon /> {name}
                      </button>
                      
                      {selectedCategory === name && name !== 'All' && (
                        <div className="ms-4 mt-2">
                          {categories.find(cat => cat.name === name).subCategories.map(subCat => (
                            <div key={subCat} className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={subCat}
                                checked={selectedSubCategories.includes(subCat)}
                                onChange={() => {
                                  setSelectedSubCategories(prev =>
                                    prev.includes(subCat)
                                      ? prev.filter(sc => sc !== subCat)
                                      : [...prev, subCat]
                                  )
                                }}
                              />
                              <label className="form-check-label" htmlFor={subCat}>
                                {subCat}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <h6 className="text-muted mt-4 mb-3">Level</h6>
                <div className="d-flex flex-column gap-2">
                  {levels.map(level => (
                    <button
                      key={level}
                      className={`btn ${
                        selectedLevel === level ? 'btn-danger text-white' : 'btn-outline-danger'
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

          {/* Courses Grid */}
          <div className="col-md-9">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="mb-0 text-muted">
                    Showing <span className="fw-bold text-dark">{courses.length}</span> courses
                  </p>
                  <div className="d-flex gap-3 align-items-center">
                    <div className="btn-group">
                      <button
                        className={`btn btn-sm ${viewMode === 'grid' ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => {
                          setViewMode('grid')
                          localStorage.setItem('courseViewMode', 'grid')
                        }}
                      >
                        <FaThLarge />
                      </button>
                      <button
                        className={`btn btn-sm ${viewMode === 'list' ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => {
                          setViewMode('list')
                          localStorage.setItem('courseViewMode', 'list')
                        }}
                      >
                        <FaThList />
                      </button>
                    </div>
                    <select 
                      className="form-select form-select-sm w-auto"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Recommended Courses */}
                {recommendedCourses.length > 0 && (
                  <div className="recommended-courses mb-4">
                    <h4 className="mb-3">
                      <FaStar className="text-warning me-2" />
                      Recommended for You
                    </h4>
                    <div className="row g-4">
                      {recommendedCourses.slice(0, 3).map(course => (
                        <div key={course.id} className="col-md-4">
                          {renderCourseCard(course)}
                        </div>
                      ))}
                    </div>
                    <hr className="my-4" />
                  </div>
                )}

                <div className={`row ${viewMode === 'list' ? 'g-4' : 'g-4'}`}>
                  {courses.map(course => (
                    <div key={course.id} className={viewMode === 'list' ? 'col-12 mb-4' : 'col-md-6 col-lg-4 mb-4'}>
                      {renderCourseCard(course)}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesPage