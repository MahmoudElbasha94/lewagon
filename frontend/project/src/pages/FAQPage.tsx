import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  Mail,
  Phone,
  MessageCircle,
  HelpCircle,
  Book,
  CreditCard,
  Users,
  Settings
} from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  name: string;
  icon: React.ElementType;
  description: string;
}

const categories: FAQCategory[] = [
  {
    name: "Getting Started",
    icon: Book,
    description: "Basic information about our platform and how to begin"
  },
  {
    name: "Payments",
    icon: CreditCard,
    description: "Questions about pricing, refunds, and billing"
  },
  {
    name: "Account",
    icon: Users,
    description: "Managing your account and profile settings"
  },
  {
    name: "Technical",
    icon: Settings,
    description: "Technical issues and platform functionality"
  }
];

const faqItems: FAQItem[] = [
  {
    id: 1,
    category: "Getting Started",
    question: "How do I create an account?",
    answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. Once verified, you can start exploring our courses immediately."
  },
  {
    id: 2,
    category: "Getting Started",
    question: "What are the system requirements?",
    answer: "Our platform works best on modern browsers like Chrome, Firefox, Safari, or Edge. You'll need a stable internet connection and a device with at least 4GB of RAM for the best learning experience."
  },
  {
    id: 3,
    category: "Payments",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For some regions, we also support local payment methods."
  },
  {
    id: 4,
    category: "Payments",
    question: "Can I get a refund?",
    answer: "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied with your purchase, you can request a refund within 30 days of purchase through our support portal."
  },
  {
    id: 5,
    category: "Account",
    question: "How do I reset my password?",
    answer: "Click the 'Forgot Password' link on the login page, enter your email address, and follow the instructions sent to your inbox. Make sure to check your spam folder if you don't see the email."
  },
  {
    id: 6,
    category: "Account",
    question: "Can I change my email address?",
    answer: "Yes, you can change your email address in your account settings. You'll need to verify the new email address before the change takes effect."
  },
  {
    id: 7,
    category: "Technical",
    question: "Videos are not playing, what should I do?",
    answer: "First, check your internet connection and try refreshing the page. If the issue persists, clear your browser cache, ensure your browser is up to date, and disable any ad-blockers that might interfere with video playback."
  },
  {
    id: 8,
    category: "Technical",
    question: "How do I download course materials?",
    answer: "Course materials can be downloaded by clicking the download icon next to each resource in your course dashboard. Note that some materials may only be available for premium subscribers."
  }
];

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-gradient-to-r from-red-600 to-red-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about our platform and services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <motion.button
              onClick={() => setSelectedCategory("All")}
              className={`p-6 rounded-xl border-2 transition-colors ${
                selectedCategory === "All"
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200 hover:border-red-600"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HelpCircle className={`w-8 h-8 mb-4 ${
                selectedCategory === "All" ? "text-red-600" : "text-gray-600"
              }`} />
              <h3 className="text-lg font-semibold mb-2">All Questions</h3>
              <p className="text-sm text-gray-600">Browse all frequently asked questions</p>
            </motion.button>

            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-6 rounded-xl border-2 transition-colors ${
                    selectedCategory === category.name
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 hover:border-red-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-8 h-8 mb-4 ${
                    selectedCategory === category.name ? "text-red-600" : "text-gray-600"
                  }`} />
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-4">
            {filteredFAQs.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openItems.includes(item.id) ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openItems.includes(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-600">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please contact our friendly team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl text-center"
            >
              <Mail className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <p className="text-gray-300 mb-4">We'll respond within 24 hours</p>
              <a
                href="mailto:support@example.com"
                className="text-red-400 hover:text-red-300"
              >
                support@example.com
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl text-center"
            >
              <Phone className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
              <p className="text-gray-300 mb-4">Mon-Fri from 8am to 5pm</p>
              <a
                href="tel:+1234567890"
                className="text-red-400 hover:text-red-300"
              >
                +1 (234) 567-890
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl text-center"
            >
              <MessageCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-gray-300 mb-4">Available 24/7</p>
              <button className="text-red-400 hover:text-red-300">
                Start Chat
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;