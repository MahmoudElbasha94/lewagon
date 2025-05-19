import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Tag,
  Search,
  Filter,
  ChevronRight,
  Star,
  Share2,
  CalendarCheck,
  ArrowRight
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  capacity: number;
  registeredCount: number;
  speaker: {
    name: string;
    role: string;
    avatar: string;
  };
  price: string;
  tags: string[];
}

const EventsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'webinar', name: 'Webinars' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'conference', name: 'Conferences' },
    { id: 'bootcamp', name: 'Bootcamps' },
    { id: 'hackathon', name: 'Hackathons' }
  ];

  const events: Event[] = [
    {
      id: 1,
      title: "Advanced Web Development Workshop",
      description: "Master modern web development techniques with hands-on practice and expert guidance. Learn the latest frameworks and best practices.",
      date: "2024-03-15",
      time: "10:00 AM - 4:00 PM",
      location: "Virtual Event",
      category: "workshop",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      capacity: 50,
      registeredCount: 35,
      speaker: {
        name: "David Chen",
        role: "Senior Developer at Tech Corp",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      price: "Free",
      tags: ["React", "Node.js", "Web Development"]
    },
    {
      id: 2,
      title: "Data Science Conference 2024",
      description: "Join leading data scientists and analysts for insights into the latest trends and innovations in data science and machine learning.",
      date: "2024-04-20",
      time: "9:00 AM - 6:00 PM",
      location: "Tech Convention Center",
      category: "conference",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      capacity: 200,
      registeredCount: 150,
      speaker: {
        name: "Dr. Sarah Johnson",
        role: "AI Research Director",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      price: "$299",
      tags: ["Data Science", "AI", "Machine Learning"]
    },
    {
      id: 3,
      title: "UI/UX Design Bootcamp",
      description: "Intensive 3-day bootcamp covering all aspects of modern UI/UX design. Perfect for beginners and intermediate designers.",
      date: "2024-03-25",
      time: "9:00 AM - 5:00 PM",
      location: "Design Studio Hub",
      category: "bootcamp",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      capacity: 30,
      registeredCount: 25,
      speaker: {
        name: "Emma Davis",
        role: "Senior UX Designer",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      price: "$499",
      tags: ["UI Design", "UX Design", "Figma"]
    },
    {
      id: 4,
      title: "Cybersecurity Webinar",
      description: "Learn about the latest cybersecurity threats and how to protect your organization from cyber attacks.",
      date: "2024-03-10",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      category: "webinar",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      capacity: 100,
      registeredCount: 80,
      speaker: {
        name: "Michael Ross",
        role: "Security Expert",
        avatar: "https://randomuser.me/api/portraits/men/92.jpg"
      },
      price: "Free",
      tags: ["Cybersecurity", "Network Security", "InfoSec"]
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
            Upcoming Events
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Join our educational events and enhance your skills with industry experts
          </p>
        </motion.div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-6 relative z-10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-red-600 font-semibold">
                  {event.price}
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-600">{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="flex items-center mb-6">
                  <img
                    src={event.speaker.avatar}
                    alt={event.speaker.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{event.speaker.name}</p>
                    <p className="text-xs text-gray-600">{event.speaker.role}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <Users className="w-4 h-4 inline mr-1" />
                    {event.registeredCount}/{event.capacity} registered
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                    Register <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter and never miss an upcoming event
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventsPage; 