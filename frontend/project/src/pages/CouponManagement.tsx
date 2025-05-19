import React, { useState } from 'react';
import {
  Gift,
  Plus,
  Calendar,
  DollarSign,
  Percent,
  Tag,
  Edit,
  Trash2,
  X,
  Check,
  AlertCircle,
  Edit2,
} from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { useCoupons } from '../contexts/CouponContext';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxUses: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'draft';
  description: string;
  courses: string[];
  minPurchaseAmount?: number;
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'SUMMER2024',
    type: 'percentage',
    value: 25,
    maxUses: 100,
    usedCount: 45,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'active',
    description: 'Summer 2024 Discount',
    courses: ['all'],
  },
  {
    id: '2',
    code: 'NEWUSER50',
    type: 'fixed',
    value: 50,
    maxUses: 50,
    usedCount: 12,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'active',
    description: 'New User Discount',
    courses: ['course-1', 'course-2'],
    minPurchaseAmount: 200,
  },
  // Add more coupons
];

interface CouponFormData {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  maxUses: number;
  courseIds?: string[];
}

const CouponManagement: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useCoupons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<string | null>(null);
  const [formData, setFormData] = useState<CouponFormData>({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    maxUses: 100
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        await updateCoupon(editingCoupon, formData);
      } else {
        await addCoupon(formData);
      }
      setIsModalOpen(false);
      setEditingCoupon(null);
      setFormData({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        maxUses: 100
      });
    } catch (error) {
      console.error('Failed to save coupon:', error);
    }
  };

  const handleEdit = (coupon: any) => {
    setEditingCoupon(coupon.id);
    setFormData({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      startDate: coupon.startDate.split('T')[0],
      endDate: coupon.endDate.split('T')[0],
      maxUses: coupon.maxUses,
      courseIds: coupon.courseIds
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (couponId: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon(couponId);
      } catch (error) {
        console.error('Failed to delete coupon:', error);
      }
    }
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const isActive = (startDate: string, endDate: string) => {
    const now = new Date();
    return new Date(startDate) <= now && now <= new Date(endDate);
  };

  return (
    <PageTransition>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Coupon Management</h1>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditingCoupon(null);
              setFormData({
                code: '',
                description: '',
                discountType: 'percentage',
                discountValue: 0,
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                maxUses: 100
              });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Coupon
          </button>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons?.map(coupon => (
            <div
              key={coupon.id}
              className={`bg-white rounded-lg shadow p-6 ${
                isExpired(coupon.endDate) ? 'opacity-60' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{coupon.code}</h3>
                  <p className="text-sm text-gray-500">{coupon.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Discount</span>
                  <span className="font-medium">
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}%`
                      : `$${coupon.discountValue}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Uses</span>
                  <span className="font-medium">
                    {coupon.usedCount} / {coupon.maxUses}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    {new Date(coupon.startDate).toLocaleDateString()} -{' '}
                    {new Date(coupon.endDate).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    isExpired(coupon.endDate)
                      ? 'bg-gray-100 text-gray-800'
                      : isActive(coupon.startDate, coupon.endDate)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {isExpired(coupon.endDate)
                    ? 'Expired'
                    : isActive(coupon.startDate, coupon.endDate)
                    ? 'Active'
                    : 'Scheduled'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingCoupon ? 'Edit Coupon' : 'Add Coupon'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Type
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountType: e.target.value as 'percentage' | 'fixed'
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={formData.discountType === 'percentage' ? '100' : '1000'}
                      value={formData.discountValue}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountValue: Number(e.target.value)
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, startDate: e.target.value }))
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      min={formData.startDate}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Uses
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxUses}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, maxUses: Number(e.target.value) }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingCoupon ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CouponManagement; 