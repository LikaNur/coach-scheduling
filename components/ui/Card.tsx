import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover ? 'hover:border-gray-300 hover:shadow-dark-lg cursor-pointer' : '';

  return (
    <div className={`bg-white border border-gray-200/80 rounded-xl p-5 shadow-dark ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
