import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const baseStyles = 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm';
  const hoverStyles = hoverable ? 'transition-shadow hover:shadow-md' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';
  
  const styles = `${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`;
  
  return (
    <div className={styles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;