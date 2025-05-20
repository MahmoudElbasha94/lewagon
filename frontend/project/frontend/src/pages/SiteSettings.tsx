import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { useSettings } from '../contexts/SettingsContext';

interface SiteSettingsForm {
  siteName: string;
  siteDescription: string;
  logo: File | null;
  favicon: File | null;
  supportEmail: string;
  defaultLanguage: string;
  currencies: string[];
  maintenanceMode: boolean;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  smtp: {
    host: string;
    port: number;
    username: string;
    password: string;
    encryption: 'none' | 'tls' | 'ssl';
  };
}

const SiteSettings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState<SiteSettingsForm>({
    siteName: settings?.siteName || '',
    siteDescription: settings?.siteDescription || '',
    logo: null,
    favicon: null,
    supportEmail: settings?.supportEmail || '',
    defaultLanguage: settings?.defaultLanguage || 'en',
    currencies: settings?.currencies || ['USD'],
    maintenanceMode: settings?.maintenanceMode || false,
    socialLinks: settings?.socialLinks || {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    smtp: settings?.smtp || {
      host: '',
      port: 587,
      username: '',
      password: '',
      encryption: 'tls'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings(formData);
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  return (
    <PageTransition>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Site Settings</h1>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description
                </label>
                <textarea
                  value={formData.siteDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteDescription: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, supportEmail: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Language
                </label>
                <select
                  value={formData.defaultLanguage}
                  onChange={(e) => setFormData(prev => ({ ...prev, defaultLanguage: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.maintenanceMode}
                    onChange={(e) => setFormData(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                    className="rounded text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
                </label>
              </div>
            </div>
          </div>

          {/* Media Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Media Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo
                </label>
                <div className="flex items-center space-x-4">
                  {settings?.logoUrl && (
                    <img
                      src={settings.logoUrl}
                      alt="Site Logo"
                      className="h-12 w-auto"
                    />
                  )}
                  <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'logo')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Favicon
                </label>
                <div className="flex items-center space-x-4">
                  {settings?.faviconUrl && (
                    <img
                      src={settings.faviconUrl}
                      alt="Favicon"
                      className="h-8 w-8"
                    />
                  )}
                  <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Favicon
                    <input
                      type="file"
                      accept="image/x-icon,image/png"
                      onChange={(e) => handleFileChange(e, 'favicon')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Social Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </div>
          </div>

          {/* SMTP Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">SMTP Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={formData.smtp.host}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, host: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="smtp.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Port
                </label>
                <input
                  type="number"
                  value={formData.smtp.port}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, port: Number(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Username
                </label>
                <input
                  type="text"
                  value={formData.smtp.username}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, username: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Password
                </label>
                <input
                  type="password"
                  value={formData.smtp.password}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, password: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Encryption
                </label>
                <select
                  value={formData.smtp.encryption}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, encryption: e.target.value as 'none' | 'tls' | 'ssl' }
                  }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="none">None</option>
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SiteSettings; 