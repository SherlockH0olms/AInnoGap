import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  const defaultStyles = 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800';
  
  return (
    <span className={className || defaultStyles}>
      {children}
    </span>
  );
};
