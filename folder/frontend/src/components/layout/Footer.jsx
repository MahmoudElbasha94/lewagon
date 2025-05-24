import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Le Wagon</h5>
            <p className="text-white-50">
              Learn to code with Le Wagon's intensive bootcamp. Join our community of developers and start your journey in tech.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-white"><FaInstagram size={20} /></a>
              <a href="#" className="text-white"><FaLinkedin size={20} /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h6 className="text-white mb-4">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/courses" className="text-white-50 text-decoration-none">Courses</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-50 text-decoration-none">About</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h6 className="text-white mb-4">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/faq" className="text-white-50 text-decoration-none">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link to="/help" className="text-white-50 text-decoration-none">Help Center</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-white-50 text-decoration-none">Terms of Service</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-white-50 text-decoration-none">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <h6 className="text-white mb-4">Newsletter</h6>
            <p className="text-white-50 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="my-4 bg-white-50" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-white-50 mb-0">
              © {new Date().getFullYear()} Le Wagon. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <img src="/images/payment-methods.png" alt="Payment Methods" height="30" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 