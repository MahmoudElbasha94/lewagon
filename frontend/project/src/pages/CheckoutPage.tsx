import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import type { Course } from '../types/Course';
import {
  CreditCard,
  Lock,
  Shield,
  Clock,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Award,
  ArrowRight,
  Building as Bank,
  Wallet
} from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, enrollInCourse } = useCourses();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'wallet'>('card');
  const [installments, setInstallments] = useState<'full' | '3' | '6'>('full');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Find the course - handle both string and number IDs
  const course = courses.find(c => String(c.id) === String(courseId));

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/courses')}
            className="text-red-600 hover:text-red-700 font-medium flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Calculate prices
  const originalPrice = course.price;
  const discount = course.discount || 0;
  const discountedPrice = originalPrice * (1 - discount / 100);
  const promoDiscount = isPromoValid ? discountedPrice * 0.1 : 0; // 10% promo discount
  const tax = (discountedPrice - promoDiscount) * 0.05; // 5% tax
  const total = discountedPrice - promoDiscount + tax;

  // Calculate installment amounts
  const installmentAmounts = {
    full: total,
    '3': Math.ceil(total / 3),
    '6': Math.ceil(total / 6)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful payment, enroll the user
      if (user && course) {
        const success = await enrollInCourse(user.id, String(course.id));
        if (success) {
          toast.success('Payment successful! You are now enrolled in the course.');
          // Navigate to the course's first lesson
          const firstLesson = course.sections[0]?.lessons[0];
          if (firstLesson) {
            navigate(`/courses/${course.id}/lessons/${firstLesson.id}`);
          } else {
            navigate(`/courses/${course.id}`);
          }
        } else {
          throw new Error('Failed to enroll in course');
        }
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error('Payment or enrollment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Enrollment</h1>
            <p className="text-gray-600">You're just a few steps away from accessing your course</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {course.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>

                  <div className="flex items-center mb-4">
                    <img
                      src={course.instructorDetails.avatar}
                      alt={course.instructorDetails.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{course.instructorDetails.name}</p>
                      <p className="text-xs text-gray-500">{course.instructorDetails.expertise[0]}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {course.duration} of content
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-gray-400" />
                      {course.certification?.type || 'Course Certificate'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Lifetime Access
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Original Price</span>
                      <span className="text-gray-900">${originalPrice}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between mb-2 text-red-600">
                        <span>Discount ({discount}%)</span>
                        <span>-${(originalPrice * discount / 100).toFixed(2)}</span>
                      </div>
                    )}
                    {isPromoValid && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>Promo Code</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2 text-gray-600">
                      <span>Tax (5%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-100">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Our Guarantees</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">30-Day Money-Back Guarantee</p>
                      <p className="text-xs text-gray-600">Not satisfied? Get a full refund within 30 days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Lock className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                      <p className="text-xs text-gray-600">Your payment information is fully encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-purple-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lifetime Access</p>
                      <p className="text-xs text-gray-600">Learn at your own pace with unlimited access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <form onSubmit={handleSubmit}>
                  {/* Payment Methods */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                          paymentMethod === 'card'
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <CreditCard className={`h-6 w-6 mb-2 ${
                          paymentMethod === 'card' ? 'text-red-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          paymentMethod === 'card' ? 'text-red-600' : 'text-gray-600'
                        }`}>Credit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                          paymentMethod === 'bank'
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Bank className={`h-6 w-6 mb-2 ${
                          paymentMethod === 'bank' ? 'text-red-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          paymentMethod === 'bank' ? 'text-red-600' : 'text-gray-600'
                        }`}>Bank Transfer</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('wallet')}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                          paymentMethod === 'wallet'
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Wallet className={`h-6 w-6 mb-2 ${
                          paymentMethod === 'wallet' ? 'text-red-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          paymentMethod === 'wallet' ? 'text-red-600' : 'text-gray-600'
                        }`}>E-Wallet</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Plan */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Plan</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setInstallments('full')}
                        className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                          installments === 'full'
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">Full Payment</div>
                        <div className="text-lg font-bold text-gray-900">${installmentAmounts.full.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">One-time payment</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInstallments('3')}
                        className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                          installments === '3'
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">3 Installments</div>
                        <div className="text-lg font-bold text-gray-900">${installmentAmounts['3'].toFixed(2)}/mo</div>
                        <div className="text-xs text-gray-500">For 3 months</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInstallments('6')}
                        className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                          installments === '6'
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">6 Installments</div>
                        <div className="text-lg font-bold text-gray-900">${installmentAmounts['6'].toFixed(2)}/mo</div>
                        <div className="text-xs text-gray-500">For 6 months</div>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                            placeholder="1234 5678 9012 3456"
                          />
                          <CreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="p-6 bg-gray-50 rounded-xl mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Bank Transfer Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Bank Name:</span>
                          <span className="font-medium text-gray-900">Example Bank</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Account Number:</span>
                          <span className="font-medium text-gray-900">1234567890</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">IBAN:</span>
                          <span className="font-medium text-gray-900">EX12 3456 7890 1234</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="p-6 bg-gray-50 rounded-xl mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Available E-Wallets</h4>
                      <div className="space-y-3">
                        <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:border-red-500 transition-all duration-200">
                          <span className="font-medium text-gray-900">PayPal</span>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </button>
                        <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:border-red-500 transition-all duration-200">
                          <span className="font-medium text-gray-900">Google Pay</span>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </button>
                        <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:border-red-500 transition-all duration-200">
                          <span className="font-medium text-gray-900">Apple Pay</span>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Promo Code */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter promo code"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPromoValid(true)}
                        className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-8">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded transition-all duration-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the <button type="button" className="text-red-600 hover:text-red-700">Terms and Conditions</button>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing || !agreedToTerms}
                    className="w-full px-6 py-4 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Payment
                          <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;