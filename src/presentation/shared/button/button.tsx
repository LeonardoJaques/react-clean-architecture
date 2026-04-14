import React from 'react';
import './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'liked';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...rest 
}) => {
  return (
    <button 
      className={`custom-button ${variant} ${className}`} 
      {...rest}
    >
      {children}
    </button>
  );
};
