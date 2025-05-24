import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBook, FaUser, FaComments, FaBars, FaTimes, FaSearch, FaGlobe, FaSignOutAlt, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import './Navbar.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const navItems = [
  { label: 'Courses', path: '/courses', icon: FaBook, auth: false },
  { label: 'About', path: '/about', icon: FaInfoCircle, auth: false },
  { label: 'Contact', path: '/contact', icon: FaEnvelope, auth: false },
  { label: 'Dashboard', path: '/dashboard', icon: FaUser, auth: true },
  { label: 'Support', path: '/support', icon: FaComments, auth: true },
];

const languages = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'AR', name: 'عربي', flag: '🇸🇦' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
];

function Navbar23() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Check if user is logged in by looking for the access token
    const token = localStorage.getItem('access');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false);
    navigate('/login');
  };

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
              to="/courses" 
              className="d-flex align-items-center px-3"
              style={{ color: '#FFFFFF', opacity: 0.8 }}
            >
              Courses
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              className="d-flex align-items-center px-3"
              style={{ color: '#FFFFFF', opacity: 0.8 }}
            >
              About
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/contact" 
              className="d-flex align-items-center px-3"
              style={{ color: '#FFFFFF', opacity: 0.8 }}
            >
              Contact
            </Nav.Link>
            
            {!isLoggedIn ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  className="d-flex align-items-center px-3"
                  style={{ color: '#FFFFFF', opacity: 0.8 }}
                >
                  Login
                </Nav.Link>
                <Button 
                  as={Link}
                  to="/signup"
                  variant="outline-light" 
                  className="ms-3 px-4"
                  style={{ 
                    borderColor: '#FD1015',
                    color: '#FD1015',
                    backgroundColor: 'transparent'
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
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
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar23; 