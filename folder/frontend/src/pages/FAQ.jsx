import React, { useState } from 'react'
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap'
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa'

function FAQ() {
  const [activeKey, setActiveKey] = useState('0')
  const [searchTerm, setSearchTerm] = useState('')

  const faqData = [
    {
      category: "General Questions",
      icon: "🎓",
      questions: [
        {
          question: "What is Le Wagon?",
          answer: "Le Wagon is a coding bootcamp that teaches web development and data science. We offer intensive, immersive programs designed to help you become a developer in just 9 weeks."
        },
        {
          question: "How long are the bootcamps?",
          answer: "Our full-time bootcamps are 9 weeks long, while our part-time programs run for 24 weeks. Both options provide the same comprehensive curriculum and learning outcomes."
        },
        {
          question: "Do I need prior coding experience?",
          answer: "No prior coding experience is required! Our bootcamps are designed for beginners. However, we do recommend completing our free prep work before starting to ensure you're ready for the intensive learning experience."
        }
      ]
    },
    {
      category: "Admissions & Application",
      icon: "📝",
      questions: [
        {
          question: "What is the application process?",
          answer: "The application process consists of three steps: 1) Fill out the online application form, 2) Complete a technical challenge, and 3) Have a final interview with our team. We'll guide you through each step."
        },
        {
          question: "What are the prerequisites?",
          answer: "You need to be 18+ years old, have a high school diploma or equivalent, and be fluent in English. No prior coding experience is required, but you should be motivated and ready to learn!"
        },
        {
          question: "How much does the bootcamp cost?",
          answer: "The cost varies by location. Please check our website for the most up-to-date pricing in your region. We offer various payment options and financing solutions to make the bootcamp accessible."
        }
      ]
    },
    {
      category: "Career & Job Support",
      icon: "💼",
      questions: [
        {
          question: "What kind of jobs can I get after the bootcamp?",
          answer: "Our graduates typically find jobs as Full-Stack Developers, Front-end Developers, Back-end Developers, or Product Managers. Some also become entrepreneurs and start their own tech companies."
        },
        {
          question: "Do you offer job placement assistance?",
          answer: "Yes! We provide comprehensive career support including: 1) Career coaching sessions, 2) CV and LinkedIn profile reviews, 3) Interview preparation, 4) Access to our employer network, and 5) Job search strategies."
        },
        {
          question: "What is the job placement rate?",
          answer: "Our job placement rate is consistently high, with over 90% of our graduates finding jobs in tech within 6 months of completing the bootcamp. However, success depends on your location, market conditions, and personal effort."
        }
      ]
    },
    {
      category: "Learning Experience",
      icon: "📚",
      questions: [
        {
          question: "What will I learn during the bootcamp?",
          answer: "You'll learn both front-end and back-end development, including: HTML, CSS, JavaScript, Ruby, Ruby on Rails, SQL, Git, and more. You'll also learn how to work in teams and build real projects."
        },
        {
          question: "What is the daily schedule like?",
          answer: "A typical day starts at 9:00 AM with a lecture, followed by coding challenges and pair programming. After lunch, you'll work on projects and have access to teaching assistants. The day usually ends around 6:00 PM."
        },
        {
          question: "How many students are in each batch?",
          answer: "We keep our batches small to ensure quality education. Typically, there are 20-30 students per batch, with a student-to-teacher ratio of about 5:1."
        }
      ]
    }
  ]

  const filteredCategories = faqData.filter(category => 
    category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.questions.some(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

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
              <h1 className="display-4 fw-bold mb-4">Frequently Asked Questions</h1>
              <p className="lead mb-5" style={{ opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
                Find answers to the most common questions about our bootcamps, admissions process, and career support.
              </p>
              
              {/* Search Bar */}
              <div className="position-relative mx-auto" style={{ maxWidth: '500px' }}>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary">
                    <FaSearch className="text-white-50" />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* FAQ Section */}
      <div className="py-5" style={{ backgroundColor: '#1A1A1A' }}>
        <Container>
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <span className="display-6 me-3">{category.icon}</span>
                <h2 className="h3 mb-0">{category.category}</h2>
              </div>
              <Accordion 
                activeKey={activeKey} 
                onSelect={(key) => setActiveKey(key)}
                className="faq-accordion"
              >
                {category.questions.map((item, index) => (
                  <Accordion.Item 
                    key={index} 
                    eventKey={index.toString()}
                    className="bg-dark border-secondary mb-3 rounded-3 overflow-hidden"
                  >
                    <Accordion.Header className="text-white">
                      <div className="d-flex align-items-center">
                        <span className="me-3">{activeKey === index.toString() ? <FaChevronUp /> : <FaChevronDown />}</span>
                        {item.question}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="text-white-50 bg-dark">
                      {item.answer}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ))}
        </Container>
      </div>

      {/* Contact Section */}
      <div className="py-5 position-relative" style={{ backgroundColor: '#111111' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
          background: 'linear-gradient(45deg, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1
        }}></div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="text-center">
            <Col>
              <h2 className="h3 mb-4">Still have questions?</h2>
              <p className="lead mb-4" style={{ opacity: 0.8 }}>
                Our team is here to help! Contact us for more information about our bootcamps.
              </p>
              <a 
                href="/contact" 
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
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default FAQ 