import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, Users, BookOpen, Calendar, Mail, Linkedin, Github, Globe } from 'lucide-react';
import { Instructor } from '../types';

interface InstructorDetailsProps {
  instructor: Instructor;
  onClose: () => void;
}

export const InstructorDetails: React.FC<InstructorDetailsProps> = ({ instructor, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
    >
      {/* Header */}
      <div className="relative h-64 bg-gradient-to-r from-red-600 to-red-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <X size={24} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
          <div className="relative">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
            />
          </div>
          <div className="ml-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{instructor.name}</h2>
            <div className="flex flex-wrap gap-2">
              {instructor.expertise.map((exp, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-white/20"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{instructor.rating}</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{instructor.totalStudents}</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <BookOpen className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{instructor.totalCourses}</div>
            <div className="text-sm text-gray-600">Courses</div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <p className="text-gray-600 leading-relaxed">{instructor.bio}</p>
        </div>

        {/* Contact & Social */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${instructor.email}`}
                className="flex items-center gap-3 text-gray-600 hover:text-red-600"
              >
                <Mail className="w-5 h-5" />
                <span>Send Email</span>
              </a>
              <a
                href="#schedule"
                className="flex items-center gap-3 text-gray-600 hover:text-red-600"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule a Meeting</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {instructor.socialLinks?.linkedin && (
                <a
                  href={instructor.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-600 hover:text-red-600" />
                </a>
              )}
              {instructor.socialLinks?.github && (
                <a
                  href={instructor.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-600 hover:text-red-600" />
                </a>
              )}
              {instructor.socialLinks?.website && (
                <a
                  href={instructor.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
                >
                  <Globe className="w-5 h-5 text-gray-600 hover:text-red-600" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 