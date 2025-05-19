/*
ملف إعدادات الموقع
هذا الملف يحتوي على وظائف إدارة إعدادات الموقع في التطبيق
سيتم استبداله بملف views.py في Django مع استخدام Django REST Framework
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Trash2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import type { Settings } from '../types/Settings';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';

const SiteSettings: React.FC = () => {
  const { settings, loading, error, updateSettings, uploadLogo, uploadFavicon } = useSettings();
  const [formData, setFormData] = useState<Partial<Settings>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // وظيفة تحديث البيانات عند تحميل الإعدادات
  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  // وظيفة تحديث حقل في النموذج
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // وظيفة حفظ الإعدادات
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings(formData);
      // TODO: إضافة رسالة نجاح
    } catch (error) {
      console.error('فشل تحديث الإعدادات:', error);
    }
  };

  // وظيفة رفع الشعار
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      try {
        await uploadLogo(file);
        // TODO: إضافة رسالة نجاح
      } catch (error) {
        console.error('فشل رفع الشعار:', error);
      }
    }
  };

  // وظيفة رفع الأيقونة
  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      try {
        await uploadFavicon(file);
        // TODO: إضافة رسالة نجاح
      } catch (error) {
        console.error('فشل رفع الأيقونة:', error);
      }
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
                      onChange={(e) => handleLogoUpload(e)}
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
                      onChange={(e) => handleFaviconUpload(e)}
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
                  value={formData.socialLinks?.facebook}
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
                  value={formData.socialLinks?.twitter}
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
                  value={formData.socialLinks?.instagram}
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
                  value={formData.socialLinks?.linkedin}
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
                  value={formData.smtp?.host}
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
                  value={formData.smtp?.port}
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
                  value={formData.smtp?.username}
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
                  value={formData.smtp?.password}
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
                  value={formData.smtp?.encryption}
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