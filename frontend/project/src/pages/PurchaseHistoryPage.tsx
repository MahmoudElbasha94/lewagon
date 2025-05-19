/*
ملف سجل المشتريات
هذا الملف يحتوي على وظائف إدارة سجل مشتريات الطلاب في التطبيق
سيتم استبداله بملف views.py في Django مع استخدام Django REST Framework
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  FileText, 
  Download, 
  CreditCard, 
  Calendar, 
  DollarSign,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import { PurchaseHistory, Invoice } from '../types';

// Mock data - replace with actual API calls in production
const mockPurchases: PurchaseHistory[] = [
  {
    id: '1',
    courseId: 'course-1',
    courseName: 'Advanced Web Development',
    courseImage: '/images/courses/web-dev.jpg',
    purchaseDate: '2024-03-15T10:30:00Z',
    amount: 199.99,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'Visa •••• 4242',
    invoiceUrl: '/invoices/INV-2024-001.pdf',
    transactionId: 'txn_1234567890'
  },
  {
    id: '2',
    courseId: 'course-2',
    courseName: 'UI/UX Design Masterclass',
    courseImage: '/images/courses/uiux.jpg',
    purchaseDate: '2024-02-28T15:45:00Z',
    amount: 149.99,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'PayPal',
    invoiceUrl: '/invoices/INV-2024-002.pdf',
    transactionId: 'txn_0987654321'
  }
];

const mockInvoices: Record<string, Invoice> = {
  '1': {
    id: '1',
    purchaseId: '1',
    invoiceNumber: 'INV-2024-001',
    issueDate: '2024-03-15T10:30:00Z',
    dueDate: '2024-03-15T10:30:00Z',
    amount: 199.99,
    currency: 'USD',
    status: 'paid',
    items: [
      {
        description: 'Advanced Web Development Course',
        quantity: 1,
        unitPrice: 199.99,
        total: 199.99
      }
    ],
    subtotal: 199.99,
    tax: 0,
    total: 199.99,
    billingDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St, City, Country',
      country: 'United States'
    }
  }
};

const PurchaseHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);

  // وظيفة جلب سجل المشتريات
  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      // TODO: استبدال هذا باستدعاء API حقيقي
      // const response = await fetch('/api/purchases');
      // const data = await response.json();
      // setPurchases(data);
      setLoading(false);
    } catch (error) {
      console.error('فشل جلب سجل المشتريات:', error);
      setError('حدث خطأ أثناء جلب سجل المشتريات');
      setLoading(false);
    }
  };

  const toggleInvoice = (purchaseId: string) => {
    setExpandedInvoice(expandedInvoice === purchaseId ? null : purchaseId);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStatusColor = (status: PurchaseHistory['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // وظيفة تحميل الفاتورة
  const handleDownloadInvoice = async (purchaseId: string) => {
    try {
      // TODO: استبدال هذا باستدعاء API حقيقي
      // const response = await fetch(`/api/purchases/${purchaseId}/invoice`);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `invoice-${purchaseId}.pdf`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
      // document.body.removeChild(a);
      console.log('تحميل الفاتورة:', purchaseId);
    } catch (error) {
      console.error('فشل تحميل الفاتورة:', error);
    }
  };

  // وظيفة عرض تفاصيل الشراء
  const handleViewDetails = (purchase: PurchaseHistory) => {
    setExpandedInvoice(purchase.id);
  };

  // وظيفة إغلاق تفاصيل الشراء
  const handleCloseDetails = () => {
    setExpandedInvoice(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
              <div className="text-gray-600">
                <span className="font-medium">{mockPurchases.length}</span> purchases
              </div>
            </div>

            {/* Purchase List */}
            <div className="space-y-6">
              {mockPurchases.map((purchase) => (
                <div key={purchase.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Purchase Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img
                            src={purchase.courseImage}
                            alt={purchase.courseName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {purchase.courseName}
                          </h3>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {format(new Date(purchase.purchaseDate), 'MMM d, yyyy')}
                            </span>
                            <span className="flex items-center">
                              <CreditCard className="w-4 h-4 mr-1" />
                              {purchase.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {formatCurrency(purchase.amount, purchase.currency)}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                          {purchase.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Actions */}
                  <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleInvoice(purchase.id)}
                        icon={expandedInvoice === purchase.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      >
                        {expandedInvoice === purchase.id ? 'Hide Details' : 'View Details'}
                      </Button>
                      {purchase.invoiceUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Download className="w-4 h-4" />}
                          onClick={() => handleDownloadInvoice(purchase.id)}
                        >
                          Download Invoice
                        </Button>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Transaction ID: {purchase.transactionId}
                    </div>
                  </div>

                  {/* Expanded Invoice Details */}
                  {expandedInvoice === purchase.id && mockInvoices[purchase.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h4>
                        
                        {/* Invoice Information */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Bill To</h5>
                            <div className="text-sm text-gray-900">
                              <p>{mockInvoices[purchase.id].billingDetails.name}</p>
                              <p>{mockInvoices[purchase.id].billingDetails.email}</p>
                              <p>{mockInvoices[purchase.id].billingDetails.address}</p>
                              <p>{mockInvoices[purchase.id].billingDetails.country}</p>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Invoice Info</h5>
                            <div className="text-sm text-gray-900">
                              <p>Invoice Number: {mockInvoices[purchase.id].invoiceNumber}</p>
                              <p>Issue Date: {format(new Date(mockInvoices[purchase.id].issueDate), 'MMM d, yyyy')}</p>
                              <p>Due Date: {format(new Date(mockInvoices[purchase.id].dueDate), 'MMM d, yyyy')}</p>
                            </div>
                          </div>
                        </div>

                        {/* Invoice Items */}
                        <div className="border rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Quantity
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Unit Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {mockInvoices[purchase.id].items.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.description}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {item.quantity}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {formatCurrency(item.unitPrice, mockInvoices[purchase.id].currency)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {formatCurrency(item.total, mockInvoices[purchase.id].currency)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                              <tr>
                                <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                                  Subtotal
                                </td>
                                <td className="px-6 py-3 text-right text-sm text-gray-900">
                                  {formatCurrency(mockInvoices[purchase.id].subtotal, mockInvoices[purchase.id].currency)}
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                                  Tax
                                </td>
                                <td className="px-6 py-3 text-right text-sm text-gray-900">
                                  {formatCurrency(mockInvoices[purchase.id].tax, mockInvoices[purchase.id].currency)}
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                                  Total
                                </td>
                                <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                                  {formatCurrency(mockInvoices[purchase.id].total, mockInvoices[purchase.id].currency)}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {mockPurchases.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
                <p className="text-gray-500">When you purchase a course, it will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PurchaseHistoryPage; 