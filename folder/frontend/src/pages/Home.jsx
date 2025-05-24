import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [showDemo, setShowDemo] = useState(false);

  const stats = [
    { icon: 'bi-people', label: 'Active Learners', value: '50K+' },
    { icon: 'bi-book', label: 'Total Courses', value: '300+' },
    { icon: 'bi-star', label: 'Expert Instructors', value: '100+' },
  ];

  const categories = [
    {
      icon: 'bi-code-square',
      title: 'Web Development',
      description: 'Learn frontend and backend development',
      courses: 45,
      color: 'primary'
    },
    {
      icon: 'bi-database',
      title: 'Data Science',
      description: 'Master data analysis and machine learning',
      courses: 32,
      color: 'success'
    },
    {
      icon: 'bi-palette',
      title: 'UI/UX Design',
      description: 'Create beautiful user interfaces',
      courses: 28,
      color: 'info'
    },
    {
      icon: 'bi-graph-up',
      title: 'Business Analytics',
      description: 'Drive business decisions with data',
      courses: 25,
      color: 'warning'
    },
    {
      icon: 'bi-globe',
      title: 'Digital Marketing',
      description: 'Master modern marketing strategies',
      courses: 30,
      color: 'danger'
    },
    {
      icon: 'bi-shield',
      title: 'Cyber Security',
      description: 'Protect systems and networks',
      courses: 22,
      color: 'secondary'
    },
    {
      icon: 'bi-cpu',
      title: 'AI & Machine Learning',
      description: 'Build intelligent applications',
      courses: 35,
      color: 'dark'
    },
    {
      icon: 'bi-cloud',
      title: 'Cloud Computing',
      description: 'Master cloud technologies',
      courses: 27,
      color: 'primary'
    }
  ];

  const features = [
    {
      icon: 'bi-book',
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with years of experience in their fields.'
    },
    {
      icon: 'bi-people',
      title: 'Interactive Learning',
      description: 'Engage with peers and instructors in real-time collaborative sessions.'
    },
    {
      icon: 'bi-trophy',
      title: 'Certification',
      description: 'Earn recognized certificates upon completion of your courses.'
    },
    {
      icon: 'bi-bullseye',
      title: 'Personalized Path',
      description: 'Follow a customized learning path tailored to your goals and pace.'
    },
    {
      icon: 'bi-lightbulb',
      title: 'Practical Projects',
      description: 'Apply your knowledge through hands-on projects and real-world scenarios.'
    },
    {
      icon: 'bi-rocket',
      title: 'Career Growth',
      description: 'Access career support, mentorship, and job placement assistance.'
    },
    {
      icon: 'bi-clock',
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with 24/7 access to course materials.'
    },
    {
      icon: 'bi-shield',
      title: 'Quality Content',
      description: 'Access regularly updated, industry-relevant curriculum.'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      description: 'Master React 18 with Redux, Hooks, and all the modern tools and best practices used by top companies.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      instructor: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        role: 'Senior Developer'
      },
      rating: 4.9,
      students: 15000,
      duration: '22h 30m',
      level: 'Intermediate',
      price: '$89.99'
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      description: 'Learn UI/UX design from scratch with industry best practices and modern tools.',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      instructor: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        role: 'Design Lead'
      },
      rating: 4.8,
      students: 12000,
      duration: '18h 45m',
      level: 'Beginner',
      price: '$79.99'
    },
    {
      id: 3,
      title: 'Advanced JavaScript Programming',
      description: 'Take your JavaScript skills to the next level with advanced concepts and patterns.',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      instructor: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        role: 'Senior Developer'
      },
      rating: 4.7,
      students: 8000,
      duration: '25h',
      level: 'Advanced',
      price: '$94.99'
    }
  ];

  const partners = [
    { name: 'Google', logo: '/images/partners/google.png' },
    { name: 'Microsoft', logo: '/images/partners/microsoft.png' },
    { name: 'Amazon', logo: '/images/partners/amazon.png' },
    { name: 'Apple', logo: '/images/partners/apple.png' },
    { name: 'Meta', logo: '/images/partners/meta.png' },
    { name: 'Netflix', logo: '/images/partners/netflix.png' }
  ];

  return (
    <div className="bg-dark text-white">
      {/* Hero Section */}
      <section className="position-relative py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="bg-dark bg-opacity-75 p-4 rounded-3 border border-secondary">
                <h1 className="display-4 fw-bold mb-4">
                  <span className="d-block text-danger">Transform Your</span>
                  <span className="d-block mt-2 text-danger">Future with Us</span>
                </h1>
                <p className="lead mb-4 text-secondary">
                  Unlock your potential with our expert-led courses. Join a community of learners and start your journey to success today.
                </p>
                <div className="d-flex gap-3">
                  <button className="btn btn-light btn-lg rounded-pill px-4">
                    Explore Courses
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                  <button 
                    className="btn btn-outline-light btn-lg rounded-pill px-4"
                    onClick={() => setShowDemo(true)}
                  >
                    <i className="bi bi-play-circle me-2"></i>
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="row mt-5 g-4">
                {stats.map((stat, index) => (
                  <div key={index} className="col-4">
                    <div className="bg-dark bg-opacity-75 p-3 rounded-3 text-center border border-secondary">
                      <i className={`bi ${stat.icon} fs-1 text-danger mb-2`}></i>
                      <div className="h4 text-white mb-0">{stat.value}</div>
                      <div className="small text-secondary">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 position-relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Students learning" 
                className="img-fluid rounded-3 shadow border border-secondary"
              />
              {/* Floating Cards */}
              <div className="position-absolute top-25 start-0 translate-middle-x bg-white rounded-3 shadow p-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-danger bg-opacity-10 rounded-circle p-2">
                    <i className="bi bi-book text-danger"></i>
                  </div>
                  <div>
                    <p className="mb-0 fw-medium text-dark">300+ Courses</p>
                    <small className="text-secondary">Learn at your pace</small>
                  </div>
                </div>
              </div>
              <div className="position-absolute bottom-25 end-0 translate-middle-x bg-white rounded-3 shadow p-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-danger bg-opacity-10 rounded-circle p-2">
                    <i className="bi bi-people text-danger"></i>
                  </div>
                  <div>
                    <p className="mb-0 fw-medium text-dark">50K+ Students</p>
                    <small className="text-secondary">Join our community</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Explore Categories</h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className={`card bg-dark border-${category.color} h-100`}>
                  <div className="card-body">
                    <div className={`text-${category.color} mb-3`}>
                      <i className={`bi ${category.icon} fs-1`}></i>
                    </div>
                    <h5 className="card-title text-white">{category.title}</h5>
                    <p className="card-text text-secondary">{category.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-white">{category.courses} Courses</span>
                      <button className={`btn btn-outline-${category.color}`}>
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-dark bg-opacity-75">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Us</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card bg-dark border-secondary h-100">
                  <div className="card-body text-center">
                    <div className="text-danger mb-3">
                      <i className={`bi ${feature.icon} fs-1`}></i>
                    </div>
                    <h5 className="card-title text-white">{feature.title}</h5>
                    <p className="card-text text-secondary">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="popular-courses py-24 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-red-600 fw-semibold text-sm text-uppercase tracking-wider">Featured Courses</span>
            <h2 className="mt-3 display-4 fw-bold text-gray-900">Most Popular Courses</h2>
            <p className="mt-4 lead text-gray-600">
              Start your learning journey with our top-rated courses
            </p>
          </div>

          <div className="row g-4">
            {courses.map((course, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 shadow-lg hover-shadow-xl transition-all bg-white overflow-hidden">
                  <div className="position-relative h-48 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-100 h-100 object-fit-cover" />
                    <div className="position-absolute top-4 end-4 bg-white bg-opacity-90 px-3 py-1 rounded-pill text-red-600 fw-semibold">
                      {course.price}
                    </div>
                  </div>
                  <div className="card-body p-6">
                    <div className="d-flex align-items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-pill text-sm fw-medium">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="h5 mb-2 text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="d-flex align-items-center mb-4">
                      <img src={course.instructor.avatar} alt={course.instructor.name} className="rounded-circle me-3" width="40" height="40" />
                      <div>
                        <p className="mb-0 fw-semibold text-gray-900">{course.instructor.name}</p>
                        <p className="mb-0 small text-gray-600">{course.instructor.role}</p>
                      </div>
                    </div>
                    <div className="row g-4 py-4 border-top">
                      <div className="col-4 text-center">
                        <div className="d-flex align-items-center justify-content-center text-warning mb-1">
                          <i className="bi bi-star-fill"></i>
                          <span className="ms-1 small fw-semibold text-gray-900">{course.rating}</span>
                        </div>
                        <p className="small text-gray-600 mb-0">Rating</p>
                      </div>
                      <div className="col-4 text-center">
                        <div className="d-flex align-items-center justify-content-center text-gray-900 mb-1">
                          <i className="bi bi-people"></i>
                          <span className="ms-1 small fw-semibold">{(course.students / 1000).toFixed(1)}k</span>
                        </div>
                        <p className="small text-gray-600 mb-0">Students</p>
                      </div>
                      <div className="col-4 text-center">
                        <div className="d-flex align-items-center justify-content-center text-gray-900 mb-1">
                          <i className="bi bi-clock"></i>
                          <span className="ms-1 small fw-semibold">{course.duration}</span>
                        </div>
                        <p className="small text-gray-600 mb-0">Duration</p>
                      </div>
                    </div>
                    <button className="btn w-100 d-flex align-items-center justify-content-center px-4 py-3 rounded-3 bg-red-600 text-white hover:bg-red-700 transition-all">
                      <span>Learn More</span>
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-lg rounded-pill px-5 bg-gradient-to-r from-red-600 to-red-700 text-white border-0 hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl">
              View All Courses
              <i className="bi bi-book ms-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-red-600 fw-semibold text-sm text-uppercase tracking-wider">Our Partners</span>
            <h2 className="mt-3 display-4 fw-bold text-gray-900">Trusted by Industry Leaders</h2>
            <p className="mt-4 lead text-gray-600">
              We partner with leading companies to provide the best learning experience
            </p>
          </div>

          <div className="row align-items-center justify-content-center g-4">
            {partners.map((partner, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-2">
                <div className="d-flex align-items-center justify-content-center p-4">
                  <img src={partner.logo} alt={partner.name} className="img-fluid opacity-75 hover-opacity-100 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-24 bg-gray-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="display-4 fw-bold mb-6 text-white">What Our Students Say</h2>
            <p className="lead text-gray-400">
              Hear from our graduates about their learning experience
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg bg-gray-800 border border-gray-700">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <img src="/images/student1.jpg" alt="Student" className="rounded-circle me-3" width="60" height="60" />
                    <div>
                      <h4 className="h6 mb-0 text-white">Sarah Johnson</h4>
                      <small className="text-gray-400">Web Development Graduate</small>
                    </div>
                  </div>
                  <p className="card-text text-gray-300">
                    "Le Wagon gave me the skills and confidence to start my career in tech. The hands-on approach and supportive community made all the difference."
                  </p>
                  <div className="text-yellow-400">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg bg-gray-800 border border-gray-700">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <img src="/images/student2.jpg" alt="Student" className="rounded-circle me-3" width="60" height="60" />
                    <div>
                      <h4 className="h6 mb-0 text-white">Michael Chen</h4>
                      <small className="text-gray-400">Data Science Graduate</small>
                    </div>
                  </div>
                  <p className="card-text text-gray-300">
                    "The bootcamp was intense but worth every minute. I learned more in 9 weeks than I did in 4 years of college."
                  </p>
                  <div className="text-yellow-400">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg bg-gray-800 border border-gray-700">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <img src="/images/student3.jpg" alt="Student" className="rounded-circle me-3" width="60" height="60" />
                    <div>
                      <h4 className="h6 mb-0 text-white">Emma Wilson</h4>
                      <small className="text-gray-400">UX/UI Design Graduate</small>
                    </div>
                  </div>
                  <p className="card-text text-gray-300">
                    "The instructors were amazing and the curriculum was perfectly structured. I got a job offer before I even graduated!"
                  </p>
                  <div className="text-yellow-400">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter py-24 bg-gradient-to-r from-red-600 to-red-800">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="display-4 fw-bold mb-4 text-white">Stay Updated</h2>
              <p className="lead mb-4 text-white">Subscribe to our newsletter for the latest updates and offers</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control form-control-lg" placeholder="Enter your email" />
                <button className="btn btn-light btn-lg">Subscribe</button>
              </div>
              <small className="text-white-50">We respect your privacy. Unsubscribe at any time.</small>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showDemo && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-gray-800 border border-gray-700">
              <div className="modal-header border-gray-700">
                <h5 className="modal-title text-white">Watch Demo</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowDemo(false)}
                ></button>
              </div>
              <div className="modal-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                    title="Demo Video"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home 