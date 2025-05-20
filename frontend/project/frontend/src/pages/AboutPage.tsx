import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Target,
  Award,
  BookOpen,
  Globe,
  Rocket,
  Shield,
  Heart
} from 'lucide-react';

const stats = [
  {
    number: "50K+",
    label: "Active Students",
    icon: Users,
    color: "text-blue-600"
  },
  {
    number: "200+",
    label: "Expert Instructors",
    icon: Award,
    color: "text-red-600"
  },
  {
    number: "1000+",
    label: "Online Courses",
    icon: BookOpen,
    color: "text-green-600"
  },
  {
    number: "95%",
    label: "Success Rate",
    icon: Target,
    color: "text-purple-600"
  }
];

const values = [
  {
    icon: Globe,
    title: "Global Access",
    description: "Learn from anywhere in the world, at any time that suits you."
  },
  {
    icon: Shield,
    title: "Quality Education",
    description: "Rigorous standards ensure top-tier educational content."
  },
  {
    icon: Heart,
    title: "Student Success",
    description: "Your success is our priority. We provide comprehensive support."
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Constantly evolving our platform with cutting-edge technology."
  }
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "Former Google executive with 15+ years in EdTech"
  },
  {
    name: "Ahmed Hassan",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Tech innovator with experience at Amazon and Microsoft"
  },
  {
    name: "Lisa Chen",
    role: "Head of Education",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    bio: "PhD in Education Technology from Stanford"
  },
  {
    name: "Michael Roberts",
    role: "Head of Content",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    bio: "Former Harvard professor and bestselling author"
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-red-600 to-red-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-5xl font-bold mb-6">
              Transforming Education for the Digital Age
            </h1>
            <p className="text-xl text-white/90 mb-8">
              We're on a mission to make quality education accessible to everyone, everywhere.
              Join us in shaping the future of learning.
            </p>
            <button className="px-8 py-3 bg-white text-red-600 rounded-lg text-lg font-semibold hover:bg-red-50 transition-colors">
              Join Our Journey
            </button>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To democratize education by providing accessible, high-quality learning
                opportunities to individuals worldwide. We believe that everyone deserves
                access to excellent education, regardless of their location or background.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  Provide world-class education to everyone
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  Foster a global community of learners
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  Break down barriers to education
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To create a world where quality education knows no boundaries. We envision
                a future where learning is personalized, engaging, and transformative,
                empowering individuals to achieve their full potential.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  Lead innovation in online education
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  Build the largest learning community
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  Transform lives through education
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-xl text-center"
                >
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do, from developing new courses
              to supporting our students.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals driving our mission forward and shaping
              the future of education.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="aspect-square relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-red-600 font-medium mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students worldwide and transform your future with
              our cutting-edge courses and expert instructors.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-red-600 rounded-lg text-lg font-semibold hover:bg-red-50 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;