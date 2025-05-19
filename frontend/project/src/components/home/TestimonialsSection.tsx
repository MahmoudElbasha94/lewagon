import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "The quality of instruction and course materials exceeded my expectations. I went from a complete beginner to landing my dream job in tech within 6 months.",
    author: {
      name: "Alex Thompson",
      role: "Software Engineer at Google",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    rating: 5,
    course: "Web Development Bootcamp"
  },
  {
    id: 2,
    content: "The hands-on projects and real-world applications really helped me understand complex concepts. The instructors are incredibly knowledgeable and supportive.",
    author: {
      name: "Emily Chen",
      role: "Data Scientist at Amazon",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    rating: 5,
    course: "Data Science Fundamentals"
  },
  {
    id: 3,
    content: "This platform transformed my career. The UI/UX course was comprehensive and practical. I'm now working as a senior designer at a top tech company.",
    author: {
      name: "David Martinez",
      role: "UX Designer at Apple",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    rating: 5,
    course: "UI/UX Design Masterclass"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
        </div>

        {/* Section Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-red-600 font-semibold text-sm uppercase tracking-wider"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-4xl font-bold text-gray-900"
          >
            What Our Students Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-600"
          >
            Hear from our successful graduates who transformed their careers
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Course Name */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                  {testimonial.course}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.author.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-red-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-red-100">Employment Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-red-100">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-red-100">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-red-100">Top Companies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;