import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Palette, ChartBar, Globe, Shield, Cpu, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Learn frontend and backend development',
    courses: 45,
    color: 'blue'
  },
  {
    icon: Database,
    title: 'Data Science',
    description: 'Master data analysis and machine learning',
    courses: 32,
    color: 'green'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Create beautiful user interfaces',
    courses: 28,
    color: 'purple'
  },
  {
    icon: ChartBar,
    title: 'Business Analytics',
    description: 'Drive business decisions with data',
    courses: 25,
    color: 'yellow'
  },
  {
    icon: Globe,
    title: 'Digital Marketing',
    description: 'Master modern marketing strategies',
    courses: 30,
    color: 'pink'
  },
  {
    icon: Shield,
    title: 'Cyber Security',
    description: 'Protect systems and networks',
    courses: 22,
    color: 'red'
  },
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    description: 'Build intelligent applications',
    courses: 35,
    color: 'indigo'
  },
  {
    icon: Cloud,
    title: 'Cloud Computing',
    description: 'Master cloud technologies',
    courses: 27,
    color: 'teal'
  }
];

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
    pink: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
    red: 'bg-red-50 text-red-600 hover:bg-red-100',
    indigo: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
    teal: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
  };
  return colorMap[color] || colorMap.blue;
};

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-red-600 font-semibold text-sm uppercase tracking-wider"
          >
            Learning Paths
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-4xl font-bold text-gray-900"
          >
            Explore Our Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-600"
          >
            Choose from a wide range of courses across different domains
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/courses?category=${category.title.toLowerCase()}`}
                className={`block rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${getColorClasses(category.color)}`}
              >
                <category.icon className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-sm opacity-90 mb-4">{category.description}</p>
                <div className="flex items-center text-sm">
                  <span className="font-semibold">{category.courses}+ Courses</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection; 