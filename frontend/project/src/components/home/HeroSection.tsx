import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Active Learners', value: '50K+' },
    { icon: BookOpen, label: 'Total Courses', value: '300+' },
    { icon: Star, label: 'Expert Instructors', value: '100+' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-800 pt-16 pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.15] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for better text visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl relative z-10"
          >
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
                <span className="block">Transform Your</span>
                <span className="block mt-2 text-white">Future with Us</span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-white drop-shadow-lg font-medium">
                Unlock your potential with our expert-led courses. Join a community of learners and start your journey to success today.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/courses"
                  className="group relative inline-flex items-center gap-x-2 rounded-full px-8 py-4 text-lg font-semibold text-red-600 bg-white hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Courses
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  className="group inline-flex items-center gap-x-2 rounded-full px-6 py-4 text-lg font-semibold text-white hover:text-red-100 transition-all duration-300"
                >
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm group-hover:bg-white/40">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center bg-black/30 backdrop-blur-sm p-4 rounded-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-white drop-shadow-lg">{stat.value}</div>
                    <div className="text-sm font-medium text-white">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative lg:mt-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent rounded-2xl" />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Students learning"
                className="rounded-2xl shadow-2xl relative z-10"
              />
              {/* Floating Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-lg p-4 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">300+ Courses</p>
                    <p className="text-xs text-gray-600">Learn at your pace</p>
                  </div>
                </div>
              </motion.div>
              {/* Floating Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -right-8 bottom-1/4 bg-white rounded-xl shadow-lg p-4 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">50K+ Students</p>
                    <p className="text-xs text-gray-600">Join our community</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;