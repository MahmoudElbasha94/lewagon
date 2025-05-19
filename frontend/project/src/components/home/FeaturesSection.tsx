import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Trophy,
  Target,
  Lightbulb,
  Rocket,
  Clock,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Expert-Led Courses',
    description: 'Learn from industry professionals with years of experience in their fields.'
  },
  {
    icon: Users,
    title: 'Interactive Learning',
    description: 'Engage with peers and instructors in real-time collaborative sessions.'
  },
  {
    icon: Trophy,
    title: 'Certification',
    description: 'Earn recognized certificates upon completion of your courses.'
  },
  {
    icon: Target,
    title: 'Personalized Path',
    description: 'Follow a customized learning path tailored to your goals and pace.'
  },
  {
    icon: Lightbulb,
    title: 'Practical Projects',
    description: 'Apply your knowledge through hands-on projects and real-world scenarios.'
  },
  {
    icon: Rocket,
    title: 'Career Growth',
    description: 'Access career support, mentorship, and job placement assistance.'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Learn at your own pace with 24/7 access to course materials.'
  },
  {
    icon: Shield,
    title: 'Quality Content',
    description: 'Access regularly updated, industry-relevant curriculum.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Why Choose Our Platform?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Discover the features that make our learning platform stand out from the rest
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-red-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <a
            href="/courses"
            className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Browse All Courses
            <Rocket className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;