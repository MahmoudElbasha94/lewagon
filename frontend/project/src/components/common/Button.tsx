/**
 * TODO: التغييرات المطلوبة للجانغو:
 * 1. سيتم استبدال هذا المكون بـ Django Template Tag
 * 2. سيتم استخدام Django Template Filters بدلاً من CSS Classes
 * 3. سيتم استخدام Django Static Files للصور والأيقونات
 * 4. سيتم استخدام Django Template Inheritance للأنماط المشتركة
 * 5. سيتم استخدام Django Template Context بدلاً من Props
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'outline' | 'text' | 'primary' | 'secondary' | 'glass' | 'ghost' | 'gradient';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من TypeScript Types
// TODO: سيتم استخدام Django Template Filters للتحكم في الأنماط
// TODO: سيتم استخدام Django Template Context بدلاً من Type Definitions

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  gradientFrom?: string;
  gradientTo?: string;
  loadingText?: string;
}

// TODO: في الجانغو، سيتم استخدام Django Template Context بدلاً من Props Interface
// TODO: سيتم استخدام Django Template Tags بدلاً من React Props
// TODO: سيتم استخدام Django Static Files بدلاً من CSS Classes

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  onClick,
  gradientFrom = 'blue-500',
  gradientTo = 'purple-500',
  loadingText = 'Loading...',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent';
  
  // TODO: في الجانغو، سيتم استخدام Django Template Tags للتحكم في الأنماط
  // TODO: سيتم استخدام Django Static Files للصور والأيقونات
  // TODO: سيتم استخدام Django Template Filters للتحكم في الأنماط
  // TODO: سيتم استخدام Django Template Context بدلاً من Props

  const getGradientStyles = () => {
    if (variant !== 'gradient') return '';
    return `bg-gradient-to-r from-${gradientFrom} to-${gradientTo} hover:from-${gradientFrom}/90 hover:to-${gradientTo}/90 text-white focus:ring-${gradientFrom}`;
  };

  // TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من getGradientStyles
  // TODO: سيتم استخدام Django Static Files بدلاً من CSS Classes
  // TODO: سيتم استخدام Django Template Filters للتحكم في الأنماط

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border-2 border-current text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    text: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    glass: 'backdrop-blur-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 focus:ring-white/30',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
    gradient: getGradientStyles()
  };

  // TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من variantStyles
  // TODO: سيتم استخدام Django Static Files بدلاً من CSS Classes
  // TODO: سيتم استخدام Django Template Filters للتحكم في الأنماط

  const sizeStyles = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
    '2xl': 'px-10 py-5 text-2xl'
  };

  // TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من sizeStyles
  // TODO: سيتم استخدام Django Static Files بدلاً من CSS Classes
  // TODO: سيتم استخدام Django Template Filters للتحكم في الأنماط

  const loadingAnimation = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من loadingAnimation
  // TODO: سيتم استخدام Django Static Files بدلاً من CSS Animations
  // TODO: سيتم استخدام Django Template Filters للتحكم في الأنماط

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${loading ? 'relative !text-transparent' : ''}
        ${className}
      `}
      {...props}
    >
      {/* TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من motion.button */}
      {/* TODO: سيتم استخدام Django Static Files بدلاً من CSS Classes */}
      {/* TODO: سيتم استخدام Django Template Filters للتحكم في الأنماط */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-current">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              variants={loadingAnimation}
              animate="animate"
            />
            <span className="text-current">{loadingText}</span>
          </motion.div>
        </div>
      )}
      
      <div className={`flex items-center ${loading ? 'invisible' : ''}`}>
        {icon && iconPosition === 'left' && (
          <motion.span 
            className="mr-2"
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {icon}
          </motion.span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <motion.span 
            className="ml-2"
            initial={{ x: 5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {icon}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default Button;