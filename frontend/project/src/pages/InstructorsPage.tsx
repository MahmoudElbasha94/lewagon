/*
ملف إدارة المدربين
هذا الملف يحتوي على وظائف إدارة المدربين في التطبيق
سيتم استبداله بملف views.py في Django مع استخدام Django REST Framework
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Globe, Search, X, ChevronUp, Star, Users, BookOpen, Award, ChevronRight, Filter, Mail, Phone, FileText, Upload, CheckCircle } from 'lucide-react';
import { instructorService } from '../services/instructorService';
import { InstructorApplicationForm } from '../components/InstructorApplicationForm';
import { InstructorDetails } from '../components/InstructorDetails';
import { Instructor } from '../types';
import { useInView } from 'react-intersection-observer';
import { useInstructors } from '../contexts/InstructorContext';
import type { Instructor as InstructorType } from '../types/Instructor';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';

const stats = [
  { number: "50+", label: "Industry Experts" },
  { number: "10k+", label: "Students Trained" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "15", label: "Countries Coverage" }
];

const expertiseFilters = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Cloud Computing',
  'UI/UX Design',
  'Cybersecurity'
];

const expertiseCategories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Digital Marketing",
  "Business",
  "Mathematics"
];

const InstructorsPage: React.FC = () => {
  const { instructors, loading, error } = useInstructors();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'students' | 'courses'>('rating');
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [filteredInstructors, setFilteredInstructors] = useState<Instructor[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { ref: scrollRef, inView } = useInView({
    threshold: 0,
  });
  const [applicationForm, setApplicationForm] = useState<InstructorApplicationForm>({
    fullName: '',
    email: '',
    phone: '',
    expertise: [],
    experience: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchInstructors();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    filterInstructors();
  }, [searchTerm, selectedCategory, instructors]);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchInstructors = async () => {
    try {
      const data = await instructorService.getAllInstructors();
      setInstructors(data);
      setFilteredInstructors(data);
    } catch (err) {
      setError('Failed to load instructors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterInstructors = () => {
    let filtered = [...instructors];

    if (searchTerm) {
      filtered = filtered.filter(instructor =>
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.expertise.some(exp => 
          exp.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(instructor =>
        instructor.categories.includes(selectedCategory)
      );
    }

    setFilteredInstructors(filtered);
  };

  const toggleExpertiseFilter = (expertise: string) => {
    setSelectedCategory(prev =>
      prev === expertise ? null : expertise
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setApplicationForm({
      fullName: '',
      email: '',
      phone: '',
      expertise: [],
      experience: '',
      resume: null
    });

    // Reset success message and form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowApplicationForm(false);
    }, 3000);
  };

  // وظيفة ترتيب المدربين
  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.totalStudents - a.totalStudents;
      case 'courses':
        return b.courses.length - a.courses.length;
      default:
        return 0;
    }
  });

  // وظيفة عرض تفاصيل المدرب
  const handleInstructorClick = (instructorId: string) => {
    // TODO: استبدال هذا باستدعاء API حقيقي
    // navigate(`/instructors/${instructorId}`);
    console.log('عرض تفاصيل المدرب:', instructorId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
          ref={scrollRef}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Meet Our Master Coders
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Learn from the best in the industry - World-class developers, designers, and tech leaders
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="mb-12 sticky top-0 bg-white/80 backdrop-blur-lg z-10 py-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              onClick={() => setShowApplicationForm(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Become an Instructor
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 flex flex-wrap gap-3">
              {expertiseCategories.map(filter => (
                <button
                  key={filter}
                  onClick={() => toggleExpertiseFilter(filter)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    selectedCategory === filter
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-red-600"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-8 text-gray-600">
          Found {filteredInstructors.length} instructor{filteredInstructors.length !== 1 ? 's' : ''}
          {(searchTerm || selectedCategory) && ' matching your criteria'}
        </div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence>
            {sortedInstructors.map((instructor) => (
              <motion.div 
                key={instructor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedInstructor(instructor)}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 cursor-pointer"
              >
                {/* Profile Image */}
                <div className="relative h-80 bg-gray-100">
                  <img 
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60" />
                </div>

                {/* Profile Content */}
                <div className="p-8 relative -mt-16">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {instructor.expertise.map((exp, i) => (
                        <span
                          key={i}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3">{instructor.bio}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          {instructor.totalStudents}
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          {instructor.rating}
                        </div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-4">
                      {instructor.socialLinks?.linkedin && (
                        <a
                          href={instructor.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-red-100"
                          onClick={e => e.stopPropagation()}
                        >
                          <Linkedin className="text-gray-600 hover:text-red-600" />
                        </a>
                      )}
                      {instructor.socialLinks?.github && (
                        <a
                          href={instructor.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-red-100"
                          onClick={e => e.stopPropagation()}
                        >
                          <Github className="text-gray-600 hover:text-red-600" />
                        </a>
                      )}
                      {instructor.socialLinks?.website && (
                        <a
                          href={instructor.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-red-100"
                          onClick={e => e.stopPropagation()}
                        >
                          <Globe className="text-gray-600 hover:text-red-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No instructors found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={() => setShowApplicationForm(false)}
                className="absolute -top-12 right-0 text-white hover:text-red-200"
              >
                <X size={24} />
              </button>
              <InstructorApplicationForm
                onClose={() => setShowApplicationForm(false)}
                onSuccess={handleApplicationSubmit}
              />
            </div>
          </div>
        )}

        {/* Instructor Details Modal */}
        {selectedInstructor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <InstructorDetails
              instructor={selectedInstructor}
              onClose={() => setSelectedInstructor(null)}
            />
          </div>
        )}

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 z-40"
            >
              <ChevronUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InstructorsPage;