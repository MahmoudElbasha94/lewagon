import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  description: string;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  isActive: boolean;
  courses: string[];
  categories: string[];
}

interface CouponContextType {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  createCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => Promise<void>;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => Promise<void>;
  deleteCoupon: (id: string) => Promise<void>;
  validateCoupon: (code: string, courseId?: string) => Promise<{ valid: boolean; discount: number }>;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await api.get('/coupons');
      setCoupons(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch coupons');
      console.error('Error fetching coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCoupon = async (coupon: Omit<Coupon, 'id' | 'usedCount'>) => {
    try {
      setLoading(true);
      const response = await api.post('/coupons', coupon);
      setCoupons(prev => [...prev, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to create coupon');
      console.error('Error creating coupon:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCoupon = async (id: string, coupon: Partial<Coupon>) => {
    try {
      setLoading(true);
      const response = await api.put(`/coupons/${id}`, coupon);
      setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...response.data } : c));
      setError(null);
    } catch (err) {
      setError('Failed to update coupon');
      console.error('Error updating coupon:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/coupons/${id}`);
      setCoupons(prev => prev.filter(c => c.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete coupon');
      console.error('Error deleting coupon:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const validateCoupon = async (code: string, courseId?: string): Promise<{ valid: boolean; discount: number }> => {
    try {
      const response = await api.post(`/coupons/validate`, { code, courseId });
      return response.data;
    } catch (err) {
      console.error('Error validating coupon:', err);
      return { valid: false, discount: 0 };
    }
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,
        loading,
        error,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        validateCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = () => {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error('useCoupons must be used within a CouponProvider');
  }
  return context;
};

export default CouponProvider; 