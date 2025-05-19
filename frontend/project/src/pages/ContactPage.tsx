import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const officeLocations: OfficeLocation[] = [
  {
    city: "New York",
    address: "123 Broadway St, New York, NY 10013",
    phone: "+1 (234) 567-8901",
    email: "nyc@example.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  {
    city: "London",
    address: "456 Oxford St, London, UK W1C 1AP",
    phone: "+44 20 7123 4567",
    email: "london@example.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278
    }
  },
  {
    city: "Dubai",
    address: "789 Sheikh Zayed Rd, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "dubai@example.com",
    hours: "Sun-Thu: 8:00 AM - 5:00 PM",
    coordinates: {
      lat: 25.2048,
      lng: 55.2708
    }
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

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
              Contact Us
            </h1>
            <p className="text-xl text-white/90">
              Get in touch with our team. We're here to help and answer any questions you might have.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <Mail className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
              <a href="mailto:support@example.com" className="text-red-600 hover:text-red-700">
                support@example.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <Phone className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Mon-Fri from 8am to 5pm</p>
              <a href="tel:+1234567890" className="text-red-600 hover:text-red-700">
                +1 (234) 567-890
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <Globe className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Find us at our offices</p>
              <span className="text-red-600">Global Locations</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Office Locations */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2
                    ${isSubmitting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-center"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h2>
              
              {officeLocations.map((office, index) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{office.city}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-1" />
                      <span className="text-gray-600">{office.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-red-500" />
                      <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-red-600">
                        {office.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-red-500" />
                      <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-red-600">
                        {office.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-red-500" />
                      <span className="text-gray-600">{office.hours}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Follow us on social media to stay updated with the latest news and updates.
            </p>
            
            <div className="flex justify-center gap-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="bg-gray-800 p-4 rounded-full text-red-500 hover:text-red-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="bg-gray-800 p-4 rounded-full text-red-500 hover:text-red-400 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="bg-gray-800 p-4 rounded-full text-red-500 hover:text-red-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="bg-gray-800 p-4 rounded-full text-red-500 hover:text-red-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;