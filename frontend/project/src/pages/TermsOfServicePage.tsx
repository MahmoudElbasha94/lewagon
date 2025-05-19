import React from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  FileText, 
  ShieldCheck, 
  UserX, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const TermsOfServicePage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sections = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Agreement to Terms",
      content: [
        "By accessing our platform, you agree to be bound by these Terms",
        "You must be at least 18 years old to use our services",
        "You are responsible for maintaining the confidentiality of your account",
        "We reserve the right to modify these terms at any time"
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Intellectual Property",
      content: [
        "All content on the platform is our exclusive property",
        "You may not copy, modify, or distribute our content without permission",
        "Your submitted content remains your property",
        "We have the right to use your submitted content for promotional purposes"
      ]
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "User Responsibilities",
      content: [
        "Provide accurate and complete information",
        "Maintain the security of your account",
        "Comply with all applicable laws and regulations",
        "Report any unauthorized use of your account"
      ]
    },
    {
      icon: <UserX className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: [
        "Violating any laws or regulations",
        "Harassing or discriminating against others",
        "Uploading malicious content or software",
        "Attempting to gain unauthorized access"
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payment Terms",
      content: [
        "All payments are processed securely",
        "Refunds are subject to our refund policy",
        "Subscription cancellations require 30-day notice",
        "We may modify pricing with advance notice"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: [
        "We are not liable for indirect damages",
        "Our liability is limited to the amount paid for services",
        "We do not guarantee uninterrupted service",
        "Force majeure events are excluded from liability"
      ]
    }
  ];

  const acceptanceItems = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      text: "Read and understand all terms carefully"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      text: "Agree to receive updates and notifications"
    },
    {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      text: "Do not use services if you disagree with terms"
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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-800 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-800/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Please read these terms carefully before using our platform.
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
            Effective Date: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Acceptance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-lg p-8 mb-16"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Before You Continue
            </h2>
            <div className="space-y-4">
              {acceptanceItems.map((item, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  {item.icon}
                  <span className="ml-3 text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
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
          className="bg-white rounded-2xl shadow-lg p-12 mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you have any questions about these terms, please contact our legal team.
            We're here to help you understand your rights and obligations.
          </p>
          <button className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl">
            Contact Legal Team
          </button>
        </motion.div>

        {/* Footer Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm pb-8"
        >
          <p>
            By using our platform, you acknowledge that you have read and understood these Terms of Service.
            <br />
            © {new Date().getFullYear()} Learning Platform. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;