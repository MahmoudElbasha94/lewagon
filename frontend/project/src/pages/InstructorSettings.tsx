import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Camera,
  Lock,
  Bell,
  DollarSign,
  CreditCard,
} from 'lucide-react';

interface InstructorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  bio: string;
  expertise: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  avatar: string;
  paymentInfo: {
    paypalEmail?: string;
    bankAccount?: string;
    preferredCurrency: string;
  };
  notificationSettings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    newStudentAlerts: boolean;
    reviewAlerts: boolean;
    salesAlerts: boolean;
  };
}

const mockProfile: InstructorProfile = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '+1234567890',
  website: 'www.janesmith.com',
  bio: 'Experienced web developer and instructor with over 10 years of experience...',
  expertise: ['Web Development', 'JavaScript', 'React', 'Node.js'],
  socialLinks: {
    facebook: 'https://facebook.com/janesmith',
    twitter: 'https://twitter.com/janesmith',
    linkedin: 'https://linkedin.com/in/janesmith',
    youtube: 'https://youtube.com/c/janesmith',
  },
  avatar: 'https://i.pravatar.cc/150?u=jane',
  paymentInfo: {
    paypalEmail: 'jane.smith@example.com',
    bankAccount: '****1234',
    preferredCurrency: 'USD',
  },
  notificationSettings: {
    emailNotifications: true,
    pushNotifications: true,
    newStudentAlerts: true,
    reviewAlerts: true,
    salesAlerts: true,
  },
};

const InstructorSettings: React.FC = () => {
  const [profile, setProfile] = useState<InstructorProfile>(mockProfile);
  const [activeTab, setActiveTab] = useState<'profile' | 'payment' | 'notifications' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace with actual API call
      // await fetch('/api/instructor/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(profile),
      // });
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Show error message
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Replace with actual file upload API call
        // const formData = new FormData();
        // formData.append('avatar', file);
        // const response = await fetch('/api/instructor/avatar', {
        //   method: 'POST',
        //   body: formData,
        // });
        // const { avatarUrl } = await response.json();
        // setProfile(prev => ({ ...prev, avatar: avatarUrl }));
      } catch (error) {
        console.error('Failed to upload avatar:', error);
      }
    }
  };

  const handleNotificationToggle = (setting: keyof InstructorProfile['notificationSettings']) => {
    setProfile(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: !prev.notificationSettings[setting],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {(['profile', 'payment', 'notifications', 'security'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleProfileUpdate}>
              {/* Avatar */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full text-white cursor-pointer hover:bg-blue-600"
                  >
                    <Camera className="w-4 h-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{profile.name}</h3>
                  <p className="text-gray-500">{profile.email}</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={e => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={e => setProfile(prev => ({ ...prev, website: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <input
                      type="url"
                      value={profile.socialLinks.facebook}
                      onChange={e =>
                        setProfile(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      placeholder="Facebook URL"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <input
                      type="url"
                      value={profile.socialLinks.twitter}
                      onChange={e =>
                        setProfile(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      placeholder="Twitter URL"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <input
                      type="url"
                      value={profile.socialLinks.linkedin}
                      onChange={e =>
                        setProfile(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      placeholder="LinkedIn URL"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-5 h-5 text-red-600" />
                    <input
                      type="url"
                      value={profile.socialLinks.youtube}
                      onChange={e =>
                        setProfile(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, youtube: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      placeholder="YouTube URL"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Payment Settings */}
        {activeTab === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PayPal Email
                </label>
                <input
                  type="email"
                  value={profile.paymentInfo.paypalEmail}
                  onChange={e =>
                    setProfile(prev => ({
                      ...prev,
                      paymentInfo: { ...prev.paymentInfo, paypalEmail: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Account
                </label>
                <input
                  type="text"
                  value={profile.paymentInfo.bankAccount}
                  onChange={e =>
                    setProfile(prev => ({
                      ...prev,
                      paymentInfo: { ...prev.paymentInfo, bankAccount: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Currency
                </label>
                <select
                  value={profile.paymentInfo.preferredCurrency}
                  onChange={e =>
                    setProfile(prev => ({
                      ...prev,
                      paymentInfo: { ...prev.paymentInfo, preferredCurrency: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {Object.entries(profile.notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase())
                        .replace('Notifications', 'Notifications')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Receive notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleNotificationToggle(
                        key as keyof InstructorProfile['notificationSettings']
                      )
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      value ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Update Password
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Enable 2FA
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InstructorSettings; 