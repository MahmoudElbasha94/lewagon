// TODO: في الجانغو، سيتم استبال هذا المكون بـ Django Template
// TODO: سيتم استخدام Django Forms بدلاً من react-hook-form
// TODO: سيتم استخدام Django Authentication Views بدلاً من useAuth hook
// TODO: سيتم استخدام Django Messages Framework للإشعارات
// TODO: سيتم استخدام Django Session Management بدلاً من localStorage
// TODO: سيتم استخدام Django CSRF Protection للحماية
// TODO: سيتم استخدام Django Password Validation بدلاً من zod schema

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ArrowRight, Lock, Mail, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// TODO: في الجانغو، سيتم استخدام Django Forms بدلاً من react-hook-form
// TODO: سيتم استخدام Django Form Validation بدلاً من formState
// TODO: سيتم استخدام Django CSRF Protection بدلاً من form submission

// تعريف مخطط التحقق من صحة البيانات
const loginSchema = z.object({
  email: z.string()
    .email('يرجى إدخال بريد إلكتروني صحيح')
    .min(1, 'البريد الإلكتروني مطلوب'),
  password: z.string()
    .min(8, 'يجب أن تكون كلمة المرور 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل')
    .regex(/[a-z]/, 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل')
    .regex(/[0-9]/, 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل')
    .regex(/[^A-Za-z0-9]/, 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  
  // TODO: في الجانغو، سيتم استخدام Django Session بدلاً من useState
  // TODO: سيتم استخدام Django Messages Framework بدلاً من errorMessage
  // TODO: سيتم استخدام Django Rate Limiting بدلاً من loginAttempts
  // TODO: سيتم استخدام Django Cache Framework بدلاً من lockTimer

  const from = location.state?.from || '/dashboard';
  
  const { 
    register, 
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  // TODO: في الجانغو، سيتم استخدام Django Forms بدلاً من react-hook-form
  // TODO: سيتم استخدام Django Form Validation بدلاً من formState
  // TODO: سيتم استخدام Django CSRF Protection بدلاً من form submission

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimer]);

  // TODO: في الجانغو، سيتم استخدام Django Cache Framework بدلاً من useEffect
  // TODO: سيتم استخدام Django Background Tasks بدلاً من setInterval

  const handleLoginAttempt = () => {
    setLoginAttempts((prev) => {
      const attempts = prev + 1;
      if (attempts >= 3) {
        setIsLocked(true);
        setLockTimer(30);
        reset();
        return 0;
      }
      return attempts;
    });
  };
  
  // TODO: في الجانغو، سيتم استخدام Django Rate Limiting بدلاً من handleLoginAttempt
  // TODO: سيتم استخدام Django Cache Framework بدلاً من setLockTimer
  // TODO: سيتم استخدام Django Form Reset بدلاً من reset

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      // محاولة تسجيل الدخول
      const user = await login(data.email, data.password);
      
      // حفظ المستخدم في localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // توجيه المستخدم إلى صفحة لوحة التحكم
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'حدث خطأ أثناء تسجيل الدخول');
      handleLoginAttempt();
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: في الجانغو، سيتم استخدام Django Redirect بدلاً من navigate
  // TODO: سيتم استخدام Django Form Validation بدلاً من try/catch
  // TODO: سيتم استخدام Django Messages Framework بدلاً من setErrorMessage

  const inputVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  // TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من Framer Motion
  // TODO: سيتم استخدام Django Static Files بدلاً من CSS Animations

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

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-20">
        {/* TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من JSX */}
        {/* TODO: سيتم استخدام Django Static Files بدلاً من CSS Classes */}
        {/* TODO: سيتم استخدام Django Template Inheritance بدلاً من Component Composition */}
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
                Welcome Back
              </motion.h1>
              <motion.p 
                className="text-gray-300 text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Continue your coding journey
              </motion.p>
            </motion.div>

            {/* Lock Notice with Enhanced Animation */}
            <AnimatePresence>
              {isLocked && (
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent animate-pulse" />
                  <div className="relative flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-5 h-5 animate-pulse" />
                    <p>Account temporarily locked. Please try again in {lockTimer} seconds.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Section with Enhanced Styling */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <motion.div
                variants={inputVariants}
                className="group"
              >
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
                    disabled={isLocked}
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

              {/* Password Input with Similar Enhancements */}
              <motion.div
                variants={inputVariants}
                className="group"
              >
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-400" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`
                      w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg 
                      text-white placeholder-gray-400 
                      focus:ring-2 focus:ring-blue-400 focus:border-transparent
                      transition-all duration-300 ease-in-out
                      ${errors.password ? 'border-red-500/50 focus:ring-red-500' : 'border-gray-600 hover:border-gray-500'}
                    `}
                    disabled={isLocked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    disabled={isLocked}
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotate: showPassword ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.div>
                  </button>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      variants={inputVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-sm text-red-400 mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remember & Forgot with Enhanced Hover Effects */}
              <motion.div
                className="flex items-center justify-between"
                variants={inputVariants}
              >
                <label className="flex items-center space-x-2 cursor-pointer group relative">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="peer sr-only"
                      disabled={isLocked}
                    />
                    <div className="h-4 w-4 rounded border border-gray-500 bg-gray-700 peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-hover:border-gray-400 transition-colors"></div>
                    <div className="absolute inset-0 hidden peer-checked:flex items-center justify-center text-white">
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">Remember me</span>
                </label>
                <AnimatePresence>
                  {errors.rememberMe && (
                    <motion.p
                      variants={inputVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-sm text-red-400 mt-1 flex items-center gap-1 absolute -bottom-6 left-0"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.rememberMe.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors relative group"
                >
                  <span>Forgot password?</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>

              {/* Submit Button with Enhanced Animation */}
              <motion.div
                variants={inputVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  loading={isSubmitting || isLoading}
                  disabled={isLocked}
                  className="w-full relative overflow-hidden group"
                  gradientFrom="blue-500"
                  gradientTo="purple-500"
                  icon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                  iconPosition="right"
                >
                  <span className="relative z-10">Sign In</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>

              {/* Error Message with Enhanced Animation */}
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
            </form>

            {/* Social Login with Enhanced Design */}
            <motion.div
              className="mt-8"
              variants={inputVariants}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-gray-800/50 text-gray-400 text-sm">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { 
                    name: 'Google',
                    color: 'bg-red-500 hover:bg-red-600',
                    iconPath: 'M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.785h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z'
                  },
                  {
                    name: 'GitHub',
                    color: 'bg-gray-700 hover:bg-gray-600',
                    iconPath: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z'
                  }
                ].map((provider) => (
                  <motion.button
                    key={provider.name}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      ${provider.color} text-white p-3 rounded-lg 
                      flex items-center justify-center transition-all
                      shadow-lg hover:shadow-xl
                      relative overflow-hidden group
                    `}
                    disabled={isLocked}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 0.3 }}
                      transition={{ duration: 0.5 }}
                    />
                    <svg className="w-5 h-5 relative z-10" viewBox="0 0 16 16">
                      <path fill="currentColor" d={provider.iconPath} />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Signup Link with Enhanced Animation */}
            <motion.div
              className="mt-6 mb-4 text-center text-gray-300"
              variants={inputVariants}
            >
              <span>New to Le Wagon?</span>{' '}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors relative group"
              >
                <span>Create account</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;