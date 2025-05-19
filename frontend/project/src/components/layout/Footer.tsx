import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = {
    facebook: "https://www.facebook.com/lewagon",
    twitter: "https://twitter.com/Lewagonparis",
    instagram: "https://www.instagram.com/lewagon",
    linkedin: "https://www.linkedin.com/school/le-wagon",
    github: "https://github.com/lewagon",
    youtube: "https://www.youtube.com/c/lewagon"
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img
                src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/logo.png"
                alt="Le Wagon"
                className="h-8 w-auto"
              />
              <span className="ml-3 text-xl font-bold text-red-500">Le Wagon</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Change lives, learn to code. Le Wagon is ranked as the world's best coding bootcamp.
            </p>
            <div className="flex space-x-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <Github size={20} />
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-red-500">Our Programs</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/web-development" className="text-gray-400 hover:text-red-500 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/data-science" className="text-gray-400 hover:text-red-500 transition-colors">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/data-analytics" className="text-gray-400 hover:text-red-500 transition-colors">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link to="/part-time-courses" className="text-gray-400 hover:text-red-500 transition-colors">
                  Part-Time Courses
                </Link>
              </li>
              <li>
                <Link to="/online-courses" className="text-gray-400 hover:text-red-500 transition-colors">
                  Online Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-red-500">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-red-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/student-projects" className="text-gray-400 hover:text-red-500 transition-colors">
                  Student Projects
                </Link>
              </li>
              <li>
                <Link to="/career-support" className="text-gray-400 hover:text-red-500 transition-colors">
                  Career Support
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-red-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-red-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-red-500">Contact Us</h3>
            <div className="space-y-4">
              <p className="text-gray-400">
                Have a question? We're here to help!
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Get in Touch
              </Link>
              <p className="text-gray-400 mt-4">
                Or email us at:<br />
                <a href="mailto:contact@lewagon.com" className="text-red-500 hover:text-red-400">
                  contact@lewagon.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Le Wagon. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;