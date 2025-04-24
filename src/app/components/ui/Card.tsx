import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
  elevated = false
}) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl ${
        elevated ? 'shadow-lg' : 'shadow-md'
      } ${
        hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''
      } overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;