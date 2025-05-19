import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Settings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  emailServer: string;
  emailPort: string;
  emailUser: string;
  emailPassword: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  error: string | null;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  uploadLogo: (file: File) => Promise<string>;
  uploadFavicon: (file: File) => Promise<string>;
}

const defaultSettings: Settings = {
  siteName: '',
  siteDescription: '',
  logo: '',
  favicon: '',
  primaryColor: '#FF0000',
  secondaryColor: '#0000FF',
  emailServer: '',
  emailPort: '',
  emailUser: '',
  emailPassword: '',
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/settings');
      setSettings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch settings');
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      setLoading(true);
      const response = await api.put('/settings', newSettings);
      setSettings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to update settings');
      console.error('Error updating settings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadLogo = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('logo', file);
      const response = await api.post('/settings/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.logoUrl;
    } catch (err) {
      setError('Failed to upload logo');
      console.error('Error uploading logo:', err);
      throw err;
    }
  };

  const uploadFavicon = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('favicon', file);
      const response = await api.post('/settings/upload-favicon', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.faviconUrl;
    } catch (err) {
      setError('Failed to upload favicon');
      console.error('Error uploading favicon:', err);
      throw err;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        error,
        updateSettings,
        uploadLogo,
        uploadFavicon,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsProvider; 