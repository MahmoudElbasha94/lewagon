import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ArrowRight, Mail, AlertCircle, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// TODO: في Django، سيتم استخدام:
// 1. Django Forms بدلاً من Password Reset Form
// 2. Django Password Reset Views بدلاً من Reset Logic
// 3. Django Email Backend بدلاً من Reset Emails
// 4. Django Token بدلاً من Reset Tokens
// 5. Django Messages بدلاً من Form Messages

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const inputVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98,
      transition: {
        duration: 0.3
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      // Here you would typically call your API to handle password reset
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setSuccessMessage('Password reset instructions have been sent to your email.');
      reset();
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-20">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.3),transparent)]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.15, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236B7280" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          />
          
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: [null, Math.random() * -500],
                  opacity: [0.5, 0]
                }}
                transition={{ 
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full max-w-md px-4">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-gray-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-6 relative overflow-hidden"
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl" 
                 style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)' }} />

            {/* Logo Section with Enhanced Animation */}
            <motion.div 
              className="flex flex-col items-center mb-6 relative"
              variants={inputVariants}
            >
              <motion.div 
                className="flex items-center gap-3 mb-4 relative"
                animate={floatingAnimation}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-500/20 rounded-full blur-xl" />
                <Code className="h-12 w-12 text-red-400" strokeWidth={1.5} />
                <span className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  Le Wagon
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-6"
                >
                  <Sparkles className="w-5 h-5 text-red-400" />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                className="text-2xl font-semibold text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Reset Password
              </motion.h1>
              <motion.p 
                className="text-gray-300 text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Enter your email to receive reset instructions
              </motion.p>
            </motion.div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <motion.div variants={inputVariants} className="group">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-400" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="name@company.com"
                    className={`
                      w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg 
                      text-white placeholder-gray-400 
                      focus:ring-2 focus:ring-blue-400 focus:border-transparent
                      transition-all duration-300 ease-in-out
                      ${errors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-gray-600 hover:border-gray-500'}
                    `}
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      variants={inputVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-sm text-red-400 mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                variants={inputVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button 
                  type="submit" 
                  variant="gradient"
                  size="lg"
                  loading={isLoading}
                  className="w-full relative overflow-hidden group"
                  gradientFrom="blue-500"
                  gradientTo="purple-500"
                  icon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                  iconPosition="right"
                >
                  <span className="relative z-10">Send Reset Instructions</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>

              {/* Success Message */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    variants={inputVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-center text-green-400 text-sm flex items-center justify-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {successMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    variants={inputVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-center text-red-400 text-sm flex items-center justify-center gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                  >
                    <motion.div
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <AlertCircle className="w-4 h-4" />
                    </motion.div>
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Back to Login Link */}
              <motion.div
                className="mt-6 text-center text-gray-300"
                variants={inputVariants}
              >
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors relative group inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Login</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPasswordPage; 