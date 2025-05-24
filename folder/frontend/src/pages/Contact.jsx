import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'
import axios from 'axios'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/contact/api/contact/',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      setStatus({
        type: 'success',
        message: response.data.message || 'Thank you for your message! We will get back to you soon.'
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus({
        type: 'danger',
        message: error.response?.data?.error || error.response?.data?.message || 'Something went wrong. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark text-white">
      {/* Hero Section */}
      <div className="py-5" style={{ backgroundColor: '#111111' }}>
        <Container>
          <Row className="text-center py-5">
            <Col>
              <h1 className="display-4 fw-bold mb-4">Get in Touch</h1>
              <p className="lead" style={{ opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
                Have questions about our bootcamp? We're here to help! Reach out to us and we'll get back to you as soon as possible.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contact Form Section */}
      <div className="py-5" style={{ backgroundColor: '#1A1A1A' }}>
        <Container>
          <Row className="g-5">
            {/* Contact Information */}
            <Col lg={4}>
              <div className="mb-5">
                <h2 className="h3 mb-4">Contact Information</h2>
                <div className="d-flex align-items-center mb-4">
                  <FaMapMarkerAlt size={24} className="text-danger me-3" />
                  <div>
                    <h3 className="h6 mb-1">Address</h3>
                    <p style={{ opacity: 0.8 }}>123 Coding Street, Tech City, 12345</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <FaPhone size={24} className="text-danger me-3" />
                  <div>
                    <h3 className="h6 mb-1">Phone</h3>
                    <p style={{ opacity: 0.8 }}>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <FaEnvelope size={24} className="text-danger me-3" />
                  <div>
                    <h3 className="h6 mb-1">Email</h3>
                    <p style={{ opacity: 0.8 }}>contact@lewagon.com</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="h3 mb-4">Follow Us</h2>
                <div className="d-flex gap-3">
                  <a href="#" className="text-white" style={{ opacity: 0.8 }}>
                    <FaLinkedin size={24} />
                  </a>
                  <a href="#" className="text-white" style={{ opacity: 0.8 }}>
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="text-white" style={{ opacity: 0.8 }}>
                    <FaFacebook size={24} />
                  </a>
                </div>
              </div>
            </Col>

            {/* Contact Form */}
            <Col lg={8}>
              <div className="bg-dark p-4 rounded">
                <h2 className="h3 mb-4">Send us a Message</h2>
                {status.message && (
                  <Alert variant={status.type} className="mb-4">
                    {status.message}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit} noValidate>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className={`bg-dark text-white border-secondary ${errors.name ? 'border-danger' : ''}`}
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Your email"
                          className={`bg-dark text-white border-secondary ${errors.email ? 'border-danger' : ''}`}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Message subject"
                          className={`bg-dark text-white border-secondary ${errors.subject ? 'border-danger' : ''}`}
                          isInvalid={!!errors.subject}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Your message"
                          className={`bg-dark text-white border-secondary ${errors.message ? 'border-danger' : ''}`}
                          isInvalid={!!errors.message}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Button
                        type="submit"
                        variant="danger"
                        size="lg"
                        className="px-5"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Map Section */}
      <div className="py-5" style={{ backgroundColor: '#111111' }}>
        <Container>
          <Row>
            <Col>
              <div className="ratio ratio-21x9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2s!4v1579767901424!5m2!1sen!2s"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  title="Location Map"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Contact 