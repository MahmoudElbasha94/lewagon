import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Tag,
  CheckSquare,
  Gift,
  Settings,
  BarChart2,
  DollarSign,
  MessageCircle
} from 'lucide-react';

const adminRoutes = [
  {
    path: '/admin',
    label: 'Overview',
    icon: BarChart2
  },
  {
    path: '/admin/users',
    label: 'Users',
    icon: Users
  },
  {
    path: '/admin/courses',
    label: 'Courses',
    icon: BookOpen
  },
  {
    path: '/admin/categories',
    label: 'Categories',
    icon: Tag
  },
  {
    path: '/admin/course-review',
    label: 'Course Review',
    icon: CheckSquare
  },
  {
    path: '/admin/revenue',
    label: 'Revenue',
    icon: DollarSign
  },
  {
    path: '/admin/coupons',
    label: 'Coupons',
    icon: Gift
  },
  {
    path: '/admin/support',
    label: 'Support',
    icon: MessageCircle
  },
  {
    path: '/admin/settings',
    label: 'Settings',
    icon: Settings
  }
];

const AdminNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {adminRoutes.map((route) => {
                  const isActive = location.pathname === route.path;
                  const Icon = route.icon;

                  return (
                    <Link
                      key={route.path}
                      to={route.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-red-500 text-white'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {route.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav; 