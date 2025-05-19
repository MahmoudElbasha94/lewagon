import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Globe, Menu, X, Search, ChevronUp, User, LogOut, Settings, BookOpen, Users, Tag, Gift, CheckSquare, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  auth: boolean;
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
    path: "/courses",
    icon: BookOpen,
    auth: false
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: User,
    auth: true
  },
  {
    label: "Support",
    path: "/support",
    icon: MessageCircle,
    auth: true
  }
];

const adminItems: NavItem[] = [
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
    auth: true
  },
  {
    label: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
    auth: true
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: Tag,
    auth: true
  },
  {
    label: "Course Review",
    path: "/admin/course-review",
    icon: CheckSquare,
    auth: true
  },
  {
    label: "Coupons",
    path: "/admin/coupons",
    icon: Gift,
    auth: true
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
    auth: true
  }
];

const languages = [
  { code: "EN", name: "English", flag: "" },
  { code: "AR", name: "عربي", flag: "" },
  { code: "FR", name: "Français", flag: "" },
  { code: "ES", name: "Español", flag: "" },
  { code: "DE", name: "Deutsch", flag: "" },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

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
              className="flex items-center transform transition-all duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <img
                src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/logo.png"
                alt="Le Wagon"
                className="h-8 w-auto"
              />
              <span className="ml-3 text-xl font-bold text-gray-900">Le Wagon</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center ml-8 space-x-6">
              {navItems.map((item) => (
                (!item.auth || (item.auth && user)) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium ${
                      location.pathname === item.path
                        ? "text-red-600 bg-red-50"
                        : "text-gray-700 hover:bg-red-50"
                    } rounded-md transition-all duration-200`}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.label}
                  </Link>
                )
              ))}
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
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                  <span>{user.name}</span>
                  {isMobileMenuOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Profile Dropdown */}
                {isMobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    {user.role === 'admin' && (
                      <>
                        <div className="border-t border-gray-100 my-1"></div>
                        {adminItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <div className="flex items-center">
                              <item.icon className="w-4 h-4 mr-2" />
                              {item.label}
                            </div>
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 my-1"></div>
                      </>
                    )}

                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </div>
            )}
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
                            key={item.path}
                            to={item.path}
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
              (!item.auth || (item.auth && user)) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 text-sm ${
                    location.pathname === item.path
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                  } rounded-lg transition-all duration-200`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              )
            ))}

            {user ? (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <div className="px-4">
                    <p className="text-base font-medium text-gray-500">{user.name}</p>
                    <p className="text-sm font-medium text-gray-500">{user.email}</p>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    {user.role === 'admin' && (
                      <>
                        <div className="border-t border-gray-100 my-1"></div>
                        {adminItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                          >
                            <div className="flex items-center">
                              <item.icon className="w-5 h-5 mr-2" />
                              {item.label}
                            </div>
                          </Link>
                        ))}
                      </>
                    )}

                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="space-y-1">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800 hover:bg-gray-100"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
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

export default Navbar;