import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Globe, Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  submenu: {
    label: string;
    to: string;
  }[];
}

interface NavLinkProps {
  to: string;
  label: string;
  isButton?: boolean;
  mobile?: boolean;
  isActive?: boolean;
}

interface DropdownItemProps {
  item: NavItem;
  activeDropdown: string | null;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}

interface LanguageDropdownProps {
  mobile?: boolean;
}

interface SignUpButtonProps {
  mobile?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Courses",
    submenu: [
      { label: "All Courses", to: "/courses" },
      { label: "Course Details", to: "/courses/detail" },
      { label: "Instructors", to: "/instructors" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
  {
    label: "Resources",
    submenu: [
      { label: "Blog", to: "/blog" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "About Us", to: "/about" },
    ],
  },
  {
    label: "Legal",
    submenu: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms-of-service" },
    ],
  },
];

const languages = [
  { code: "EN", name: "English", flag: "" },
  { code: "AR", name: "عربي", flag: "" },
  { code: "FR", name: "Français", flag: "" },
  { code: "ES", name: "Español", flag: "" },
  { code: "DE", name: "Deutsch", flag: "" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm"
          : "bg-white"
      } transition-all duration-300`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="bg-red-600 p-2 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <img
                src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/logo.png"
                alt="Le Wagon"
                className="h-6 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center ml-8 space-x-6">
              {navItems.map((item) => (
                <DesktopDropdownItem
                  key={item.label}
                  item={item}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              ))}
              <NavLink 
                to="/events" 
                label="Events" 
                isButton={false} 
                mobile={false}
                isActive={location.pathname === "/events"}
              />
              <NavLink 
                to="/enterprise" 
                label="Enterprise" 
                isButton={false} 
                mobile={false}
                isActive={location.pathname === "/enterprise"}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
              aria-label="Open search"
            >
              <Search size={20} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-600">Search</span>
            </button>

            <LanguageDropdown mobile={false} />
            <NavLink 
              to="/login" 
              label="Log In" 
              isButton={true} 
              mobile={false}
              isActive={location.pathname === "/login"}
            />
            <SignUpButton mobile={false} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 text-center">
              <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" 
                aria-hidden="true" 
                onClick={() => setIsSearchOpen(false)} 
              />
              <div className="inline-block w-full max-w-2xl mt-24 p-6 my-8 text-left align-middle bg-white rounded-2xl shadow-xl transform transition-all duration-300 scale-95 animate-in fade-in slide-in-from-top-4">
                <div className="relative">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-red-500 transition-all duration-200 bg-gray-50 focus-within:bg-white group">
                    <Search size={20} className="ml-4 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200" />
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search anything..."
                      className="w-full px-4 py-4 text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400"
                      autoFocus
                    />
                  </div>
                  
                  <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-xl shadow-lg border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                    <div className="p-4">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Quick Links
                      </h3>
                      <div className="space-y-2">
                        {navItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.submenu[0].to}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                            onClick={() => setIsSearchOpen(false)}
                          >
                            <span className="mr-3">🔍</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200">
                          <span className="mr-3">⏱️</span>
                          React Course
                        </button>
                        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200">
                          <span className="mr-3">⏱️</span>
                          TypeScript Tutorial
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden py-4 space-y-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
          >
            {/* Search Bar for Mobile */}
            <div className="px-4 mb-4">
              <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-red-500 transition-all duration-200 bg-gray-50 focus-within:bg-white group">
                <Search size={20} className="ml-4 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full px-4 py-3 text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {navItems.map((item) => (
              <MobileDropdownItem
                key={item.label}
                item={item}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            ))}
            <NavLink 
              to="/events" 
              label="Events" 
              isButton={false} 
              mobile={true}
              isActive={location.pathname === "/events"}
            />
            <NavLink 
              to="/enterprise" 
              label="Enterprise" 
              isButton={false} 
              mobile={true}
              isActive={location.pathname === "/enterprise"}
            />
            <div className="pt-4 border-t border-gray-100">
              <LanguageDropdown mobile={true} />
              <div className="mt-4 space-y-2">
                <NavLink 
                  to="/login" 
                  label="Log In" 
                  isButton={true} 
                  mobile={true}
                  isActive={location.pathname === "/login"}
                />
                <SignUpButton mobile={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Dropdown Component
const DesktopDropdownItem: React.FC<DropdownItemProps> = ({ item, activeDropdown, setActiveDropdown }) => {
  const location = useLocation();
  
  return (
    <div
      className="relative group"
      onMouseEnter={() => setActiveDropdown(item.label)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button 
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-all duration-200"
        aria-expanded={activeDropdown === item.label}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`ml-1 transform transition-all duration-200 ${
            activeDropdown === item.label ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg transition-all duration-200 origin-top-left ${
          activeDropdown === item.label
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="p-2 space-y-1">
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.label}
              to={subItem.to}
              className={`flex items-center px-4 py-2.5 text-sm ${
                location.pathname === subItem.to
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700 hover:bg-red-50"
              } rounded-md transition-all duration-200 hover:pl-6`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mobile Dropdown Component
const MobileDropdownItem: React.FC<DropdownItemProps> = ({ item, activeDropdown, setActiveDropdown }) => {
  const location = useLocation();
  
  return (
    <div className="border-b border-gray-100 pb-2">
      <button
        onClick={() =>
          setActiveDropdown(activeDropdown === item.label ? null : item.label)
        }
        className="w-full flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
        aria-expanded={activeDropdown === item.label}
      >
        <span className="font-medium">{item.label}</span>
        <ChevronDown
          size={16}
          className={`transform transition-all duration-200 ${
            activeDropdown === item.label ? "rotate-180 text-red-600" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          activeDropdown === item.label ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="ml-4 mt-2 space-y-2">
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.label}
              to={subItem.to}
              className={`block px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                location.pathname === subItem.to
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Language Dropdown Component
const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ mobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = async (lang: typeof languages[0]) => {
    setIsLoading(true);
    try {
      // Simulate API call to change language
      await new Promise(resolve => setTimeout(resolve, 500));
      setSelectedLang(lang);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`} ref={dropdownRef}>
      <button
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${
          mobile ? "w-full justify-between px-4 py-3" : "px-3 py-2"
        } text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        disabled={isLoading}
      >
        <div className="flex items-center space-x-2">
          <Globe size={18} className={isLoading ? "animate-spin text-red-600" : "text-red-600"} />
          <span className="font-medium">{selectedLang.code}</span>
          <span className="text-lg">{selectedLang.flag}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transform transition-all duration-200 ${
            isOpen ? "rotate-180 text-red-600" : "text-gray-400"
          }`}
        />
      </button>

      <div
        className={`${
          mobile ? "mt-2 px-4" : "absolute right-0 mt-2 w-64"
        } bg-white border border-gray-100 rounded-xl shadow-xl z-50 transition-all duration-200 origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-2">
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Select Language
          </h3>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm ${
                selectedLang.code === lang.code
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-50"
              } transition-all duration-200 group relative`}
              disabled={isLoading}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              {selectedLang.code === lang.code && (
                <span className="text-red-600">✓</span>
              )}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform duration-200 ${
                  selectedLang.code === lang.code ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable NavLink Component
const NavLink: React.FC<NavLinkProps> = ({ to, label, isButton = false, mobile = false, isActive = false }) => {
  return (
    <Link
      to={to}
      className={`${
        isButton
          ? "text-gray-600 hover:text-red-600 font-medium"
          : "text-gray-600 hover:text-red-600 font-medium"
      } ${
        mobile
          ? "block px-4 py-3 hover:bg-gray-50 rounded-lg"
          : "px-3 py-2 text-sm transition-all duration-200 relative group"
      } ${isActive ? "text-red-600" : ""}`}
    >
      {label}
      {!mobile && !isButton && (
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform duration-200 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
      )}
    </Link>
  );
};

// SignUp Button Component
const SignUpButton: React.FC<SignUpButtonProps> = ({ mobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to="/signup"
      className={`relative overflow-hidden bg-red-600 text-white font-medium transition-all transform ${
        mobile
          ? "block w-full text-center px-6 py-3 rounded-lg"
          : "px-5 py-2.5 text-sm rounded-lg"
      } ${isHovered ? "shadow-lg scale-[1.02]" : "shadow-sm hover:shadow-lg hover:scale-[1.02]"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">Sign Up</span>
      <span
        className={`absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 transition-transform duration-300 ${
          isHovered ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transformOrigin: "left" }}
      />
    </Link>
  );
};

export default Navbar;