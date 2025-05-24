import React, { useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaBook, FaGraduationCap, FaUser, FaSignOutAlt, FaHome, FaBars } from 'react-icons/fa'

function StudentNavbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    navigate('/login')
  }

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="py-3"
      style={{ 
        backgroundColor: '#111111 !important',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="d-flex align-items-center"
          style={{ fontSize: '1.5rem', fontWeight: '700' }}
        >
          <img 
            src="/lewagon-logo.png" 
            alt="LeWagon" 
            height="30" 
            className="me-2"
            onError={(e) => {
              e.target.src = 'https://www.lewagon.com/assets/v4/logo-lewagon-9c19fb39a748cd3b1f49059ce0dc6c0dfc4cc2447d5a9a3e01bd2d5a214faf3c.svg'
            }}
          />
          LeWagon
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="border-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </Navbar.Toggle>

        <Navbar.Collapse 
          id="basic-navbar-nav" 
          className={`justify-content-end ${isMenuOpen ? 'show' : ''}`}
        >
          <Nav className="align-items-center">
            <Nav.Link 
              as={Link} 
              to="/student/dashboard" 
              className="d-flex align-items-center px-3"
              style={{ color: '#FFFFFF', opacity: 0.8 }}
            >
              <FaHome className="me-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/student/courses" 
              className="d-flex align-items-center px-3"
              style={{ color: '#FFFFFF', opacity: 0.8 }}
            >
              <FaBook className="me-2" />
              My Courses
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/student/certificates" 
              className="d-flex align-items-center px-3"
              style={{ color: '#FFFFFF', opacity: 0.8 }}
            >
              <FaGraduationCap className="me-2" />
              Certificates
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/student/profile" 
              className="d-flex align-items-center px-3"
              style={{ color: '#FFFFFF', opacity: 0.8 }}
            >
              <FaUser className="me-2" />
              Profile
            </Nav.Link>
            <Button 
              variant="outline-light" 
              className="ms-3 px-4"
              onClick={handleLogout}
              style={{ 
                borderColor: '#FD1015',
                color: '#FD1015',
                backgroundColor: 'transparent'
              }}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default StudentNavbar