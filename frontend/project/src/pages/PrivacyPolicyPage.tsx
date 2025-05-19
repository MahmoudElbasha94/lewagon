import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, Globe, Bell, FileCheck, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const PrivacyPolicyPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number)",
        "Payment information (processed securely through certified payment processors)",
        "Technical information (IP address, browser type, operating system)",
        "Learning preferences and course progress"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Protect Your Data",
      content: [
        "SSL/TLS encryption for secure communications",
        "End-to-end data encryption for storage",
        "Regular security monitoring and system updates",
        "Limited employee access to personal data"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Enhancing your learning experience",
        "Personalizing content and recommendations",
        "Communicating about courses and updates",
        "Analyzing and improving our services"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Access your personal data",
        "Correct or update your information",
        "Request deletion of your data",
        "Opt-out of marketing communications"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Retention",
      content: [
        "We retain data while your account is active",
        "You can request data deletion anytime",
        "Some data may be retained for legal compliance",
        "We periodically delete unnecessary data"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "International Data Transfer",
      content: [
        "Your data may be stored in different global locations",
        "We ensure appropriate safeguards for data transfers",
        "We comply with local and international data protection regulations",
        "We use trusted global service providers"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Background Pattern */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-800 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-800/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            We take your privacy seriously. Learn how we collect, use, and protect your personal data.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        {/* Last Updated Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-6 mb-16 text-center relative z-10 max-w-xl mx-auto"
        >
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-red-100 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 ml-4">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start group/item">
                      <div className="flex-shrink-0 h-6 w-6 text-red-500 mt-1 group-hover/item:text-red-600 transition-colors">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                      <p className="ml-3 text-gray-600 group-hover/item:text-gray-900 transition-colors">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-lg p-12 mb-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions About Our Privacy Policy?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is here to help you understand how we handle your personal data
            </p>
            <button className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl">
              Contact Our Privacy Team
            </button>
          </div>
        </motion.div>

        {/* Cookie Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm pb-8"
        >
          <p>
            By using our website, you agree to our Privacy Policy and Cookie Policy.
            <br />
            © {new Date().getFullYear()} Learning Platform. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;