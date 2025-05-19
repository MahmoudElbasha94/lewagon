import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import NotificationBell from '../common/NotificationBell';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        {user && (
          <div className="flex items-center space-x-4">
            <NotificationBell />
          </div>
        )}
      </Header>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;