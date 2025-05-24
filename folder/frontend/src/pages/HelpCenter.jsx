import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { FaSearch, FaBook, FaGraduationCap, FaUser, FaCreditCard, FaQuestionCircle, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('')

  const helpCategories = [
    {
      title: "Getting Started",
      icon: <FaBook size={24} />,
      description: "Learn about our bootcamps and how to get started",
      topics: [
        "What is Le Wagon?",
        "How to apply",
        "Prerequisites",
        "Bootcamp schedule"
      ]
    },
    {
      title: "Learning Journey",
      icon: <FaGraduationCap size={24} />,
      description: "Everything about your learning experience",
      topics: [
        "Curriculum details",
        "Learning methodology",
        "Projects",
        "Certification"
      ]
    },
    {
      title: "Career Support",
      icon: <FaUser size={24} />,
      description: "Career guidance and job search support",
      topics: [
        "Job placement",
        "Career coaching",
        "Networking events",
        "Alumni network"
      ]
    },
    {
      title: "Payment & Finance",
      icon: <FaCreditCard size={24} />,
      description: "Information about payments and financing",
      topics: [
        "Tuition fees",
        "Payment plans",
        "Scholarships",
        "Refund policy"
      ]
    }
  ]

  const popularQuestions = [
    {
      question: "How long is the bootcamp?",
      answer: "Our full-time bootcamp is 9 weeks long, while our part-time program runs for 24 weeks."
    },
    {
      question: "Do I need prior coding experience?",
      answer: "No prior coding experience is required. Our bootcamp is designed for beginners."
    },
    {
      question: "What kind of jobs can I get after the bootcamp?",
      answer: "Graduates typically find jobs as Full-Stack Developers, Front-end Developers, or Back-end Developers."
    },
    {
      question: "How much does the bootcamp cost?",
      answer: "The cost varies by location. Please check our website for the most up-to-date pricing in your region."
    }
  ]

  return (
    <div className="bg-dark text-white min-vh-100">
      {/* Hero Section */}
      <div className="py-5 position-relative overflow-hidden" style={{ backgroundColor: '#111111' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
          background: 'linear-gradient(45deg, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1
        }}></div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="text-center py-5">
            <Col>
              <h1 className="display-4 fw-bold mb-4">How can we help you?</h1>
              <p className="lead mb-5" style={{ opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
                Find answers to your questions about our bootcamps, admissions process, and career support.
              </p>
              
              {/* Search Bar */}
              <div className="position-relative mx-auto" style={{ maxWidth: '600px' }}>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-dark border-secondary">
                    <FaSearch className="text-white-50" />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Search for help..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Categories Section */}
      <div className="py-5" style={{ backgroundColor: '#1A1A1A' }}>
        <Container>
          <h2 className="h3 mb-5 text-center">Browse by Category</h2>
          <Row className="g-4">
            {helpCategories.map((category, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="h-100 bg-dark border-secondary">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <div className="text-danger me-3">
                        {category.icon}
                      </div>
                      <h3 className="h5 mb-0">{category.title}</h3>
                    </div>
                    <p className="text-white-50 mb-4">{category.description}</p>
                    <ul className="list-unstyled mb-0">
                      {category.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="mb-2">
                          <Link to="/faq" className="text-white-50 text-decoration-none d-flex align-items-center">
                            <FaArrowRight className="me-2" size={12} />
                            {topic}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Popular Questions Section */}
      <div className="py-5" style={{ backgroundColor: '#111111' }}>
        <Container>
          <h2 className="h3 mb-5 text-center">Popular Questions</h2>
          <Row className="g-4">
            {popularQuestions.map((item, index) => (
              <Col key={index} md={6}>
                <Card className="h-100 bg-dark border-secondary">
                  <Card.Body>
                    <div className="d-flex align-items-start">
                      <FaQuestionCircle className="text-danger me-3 mt-1" size={20} />
                      <div>
                        <h3 className="h5 mb-3">{item.question}</h3>
                        <p className="text-white-50 mb-0">{item.answer}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Contact Section */}
      <div className="py-5 position-relative" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
          background: 'linear-gradient(45deg, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1
        }}></div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="text-center">
            <Col>
              <h2 className="h3 mb-4">Still need help?</h2>
              <p className="lead mb-4" style={{ opacity: 0.8 }}>
                Our team is here to help! Contact us for more information.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link 
                  to="/contact" 
                  className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow-lg"
                  style={{ 
                    transition: 'all 0.3s ease',
                    ':hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(255,0,0,0.3)'
                    }
                  }}
                >
                  Contact Us
                </Link>
                <Link 
                  to="/faq" 
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill"
                >
                  View All FAQs
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default HelpCenter 