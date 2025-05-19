import React, { useState, useEffect } from 'react';
import PageTransition from '../../components/common/PageTransition';
import { Save, Camera, Mail, Globe, DollarSign, Bell, Shield, Book, Clock } from 'lucide-react';

interface InstructorSettings {
  profile: {
    name: string;
    bio: string;
    website: string;
    email: string;
    avatar: string;
    expertise: string[];
    languages: string[];
  };
  teaching: {
    defaultCourseLanguage: string;
    automaticEnrollment: boolean;
    courseReviewNotifications: boolean;
    studentMessageNotifications: boolean;
    paymentNotifications: boolean;
  };
  payment: {
    paypalEmail: string;
    minimumPayoutAmount: number;
    automaticPayout: boolean;
  };
  privacy: {
    showProfileToPublic: boolean;
    showRevenueInProfile: boolean;
    showCoursesCount: boolean;
    showStudentsCount: boolean;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<InstructorSettings>({
    profile: {
      name: 'John Smith',
      bio: 'Experienced software developer and educator with a passion for teaching web development.',
      website: 'https://johnsmith.dev',
      email: 'john@example.com',
      avatar: 'https://placehold.co/150',
      expertise: ['React', 'TypeScript', 'Node.js'],
      languages: ['English', 'Spanish']
    },
    teaching: {
      defaultCourseLanguage: 'english',
      automaticEnrollment: true,
      courseReviewNotifications: true,
      studentMessageNotifications: true,
      paymentNotifications: true
    },
    payment: {
      paypalEmail: 'payments@johnsmith.dev',
      minimumPayoutAmount: 100,
      automaticPayout: true
    },
    privacy: {
      showProfileToPublic: true,
      showRevenueInProfile: false,
      showCoursesCount: true,
      showStudentsCount: true
    }
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleProfileChange = (field: keyof InstructorSettings['profile'], value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleTeachingChange = (field: keyof InstructorSettings['teaching'], value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      teaching: {
        ...prev.teaching,
        [field]: value
      }
    }));
  };

  const handlePaymentChange = (field: keyof InstructorSettings['payment'], value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: value
      }
    }));
  };

  const handlePrivacyChange = (field: keyof InstructorSettings['privacy'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            avatar: reader.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    try {
      // TODO: Send settings to API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved!';
      case 'error':
        return 'Error saving';
      default:
        return 'Save Changes';
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Instructor Settings</h1>
          <button
            onClick={handleSubmit}
            disabled={saveStatus === 'saving'}
            className={`flex items-center px-4 py-2 rounded-lg text-white ${
              saveStatus === 'saving' ? 'bg-blue-400' :
              saveStatus === 'saved' ? 'bg-green-500' :
              saveStatus === 'error' ? 'bg-red-500' :
              'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            {getSaveButtonText()}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h2>
            
            <div className="flex items-start mb-6">
              <div className="relative">
                <img
                  src={settings.profile.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <label className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50">
                  <Camera className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <div className="ml-6 flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={settings.profile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  value={settings.profile.website}
                  onChange={(e) => handleProfileChange('website', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Teaching Preferences */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <Book className="w-5 h-5 inline mr-2" />
              Teaching Preferences
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Default Course Language</label>
                <select
                  value={settings.teaching.defaultCourseLanguage}
                  onChange={(e) => handleTeachingChange('defaultCourseLanguage', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.teaching.automaticEnrollment}
                    onChange={(e) => handleTeachingChange('automaticEnrollment', e.target.checked)}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable automatic enrollment for free courses</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.teaching.courseReviewNotifications}
                    onChange={(e) => handleTeachingChange('courseReviewNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Receive notifications for course reviews</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.teaching.studentMessageNotifications}
                    onChange={(e) => handleTeachingChange('studentMessageNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Receive notifications for student messages</span>
                </label>
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <DollarSign className="w-5 h-5 inline mr-2" />
              Payment Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">PayPal Email</label>
                <input
                  type="email"
                  value={settings.payment.paypalEmail}
                  onChange={(e) => handlePaymentChange('paypalEmail', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Payout Amount ($)</label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={settings.payment.minimumPayoutAmount}
                  onChange={(e) => handlePaymentChange('minimumPayoutAmount', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payment.automaticPayout}
                  onChange={(e) => handlePaymentChange('automaticPayout', e.target.checked)}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Enable automatic payouts</span>
              </label>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <Shield className="w-5 h-5 inline mr-2" />
              Privacy Settings
            </h2>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.privacy.showProfileToPublic}
                  onChange={(e) => handlePrivacyChange('showProfileToPublic', e.target.checked)}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Show my profile to public</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.privacy.showRevenueInProfile}
                  onChange={(e) => handlePrivacyChange('showRevenueInProfile', e.target.checked)}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Show revenue statistics in public profile</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.privacy.showCoursesCount}
                  onChange={(e) => handlePrivacyChange('showCoursesCount', e.target.checked)}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Show number of courses in public profile</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.privacy.showStudentsCount}
                  onChange={(e) => handlePrivacyChange('showStudentsCount', e.target.checked)}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Show number of students in public profile</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
};

export default Settings; 