import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FaGraduationCap, FaGlobe, FaUsers, FaLaptopCode, FaChartLine } from 'react-icons/fa'

function About() {
  return (
    <div className="bg-dark text-white">
      {/* Hero Section */}
      <div className="py-5" style={{ backgroundColor: '#111111' }}>
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">
                We are Le Wagon
              </h1>
              <p className="lead mb-4" style={{ opacity: 0.8 }}>
                Le Wagon is a coding bootcamp that brings technical skills to creative people. Our mission is to help people learn to code and become entrepreneurs.
              </p>
              <Button 
                variant="danger" 
                size="lg" 
                className="px-4"
                href="/courses"
              >
                Discover Our Courses
              </Button>
            </Col>
            <Col lg={6}>
              <img 
                src="https://www.lewagon.com/assets/v4/illustrations/home-illustration-9c19fb39a748cd3b1f49059ce0dc6c0dfc4cc2447d5a9a3e01bd2d5a214faf3c.svg" 
                alt="Le Wagon Illustration" 
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mission Section */}
      <div className="py-5" style={{ backgroundColor: '#1A1A1A' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-4">Our Mission</h2>
              <p className="lead" style={{ opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
                We believe that coding skills are becoming increasingly important in today's digital world. Our goal is to make these skills accessible to everyone.
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 text-center">
                <FaGraduationCap size={48} className="text-danger mb-3" />
                <h3 className="h4 mb-3">Education</h3>
                <p style={{ opacity: 0.8 }}>
                  We provide intensive coding bootcamps that teach practical skills for the real world.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 text-center">
                <FaGlobe size={48} className="text-danger mb-3" />
                <h3 className="h4 mb-3">Global Community</h3>
                <p style={{ opacity: 0.8 }}>
                  Join a network of 15,000+ alumni across 45 cities worldwide.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 text-center">
                <FaUsers size={48} className="text-danger mb-3" />
                <h3 className="h4 mb-3">Career Support</h3>
                <p style={{ opacity: 0.8 }}>
                  We help our graduates find jobs and start their tech careers.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Bootcamp Section */}
      <div className="py-5" style={{ backgroundColor: '#111111' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="https://www.lewagon.com/assets/v4/illustrations/bootcamp-illustration-9c19fb39a748cd3b1f49059ce0dc6c0dfc4cc2447d5a9a3e01bd2d5a214faf3c.svg" 
                alt="Bootcamp" 
                className="img-fluid"
              />
            </Col>
            <Col lg={6}>
              <h2 className="display-5 fw-bold mb-4">Our Bootcamp</h2>
              <p className="lead mb-4" style={{ opacity: 0.8 }}>
                Our 9-week bootcamp is designed to take you from beginner to professional developer. You'll learn the most in-demand technologies and build real projects.
              </p>
              <Row className="g-4">
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <FaLaptopCode size={24} className="text-danger me-3" />
                    <div>
                      <h4 className="h5 mb-2">Web Development</h4>
                      <p style={{ opacity: 0.8 }}>Learn HTML, CSS, JavaScript, Ruby, and more</p>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <FaChartLine size={24} className="text-danger me-3" />
                    <div>
                      <h4 className="h5 mb-2">Career Growth</h4>
                      <p style={{ opacity: 0.8 }}>Get support in finding your dream job</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <div className="py-5" style={{ backgroundColor: '#1A1A1A' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-4">Our Team</h2>
              <p className="lead" style={{ opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
                We are a team of passionate educators and developers dedicated to helping you succeed in your coding journey.
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {[1, 2, 3, 4].map((member) => (
              <Col md={3} key={member}>
                <div className="text-center">
                  <div 
                    className="rounded-circle mb-3 mx-auto" 
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      backgroundColor: '#333',
                      backgroundImage: `url(https://randomuser.me/api/portraits/${member % 2 ? 'men' : 'women'}/${member}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <h4 className="h5 mb-2">Team Member {member}</h4>
                  <p style={{ opacity: 0.8 }}>Position</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-5" style={{ backgroundColor: '#111111' }}>
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="display-5 fw-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="lead mb-4" style={{ opacity: 0.8 }}>
                Join our next batch and become part of our global community of developers.
              </p>
              <Button 
                variant="danger" 
                size="lg" 
                className="px-5"
                href="/signup"
              >
                Apply Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default About 