import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-block text-xs uppercase tracking-wider text-gray-500 font-medium ${className}`}>
      {children}
    </span>
  );
}
