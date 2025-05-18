import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'outline' | 'text' | 'primary' | 'secondary' | 'glass' | 'ghost' | 'gradient';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

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
  
  const getGradientStyles = () => {
    if (variant !== 'gradient') return '';
    return `bg-gradient-to-r from-${gradientFrom} to-${gradientTo} hover:from-${gradientFrom}/90 hover:to-${gradientTo}/90 text-white focus:ring-${gradientFrom}`;
  };

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border-2 border-current text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    text: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    glass: 'backdrop-blur-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 focus:ring-white/30',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
    gradient: getGradientStyles()
  };

  const sizeStyles = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
    '2xl': 'px-10 py-5 text-2xl'
  };

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