import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="currentColor"
          opacity="0.1"
        />
        
        {/* Medical cross - vertical bar */}
        <rect
          x="42"
          y="25"
          width="16"
          height="50"
          rx="2"
          fill="currentColor"
        />
        
        {/* Medical cross - horizontal bar */}
        <rect
          x="25"
          y="42"
          width="50"
          height="16"
          rx="2"
          fill="currentColor"
        />
        
        {/* Stethoscope tube - left side */}
        <path
          d="M20 30 Q15 35 15 42 Q15 48 20 52"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Stethoscope tube - right side */}
        <path
          d="M80 30 Q85 35 85 42 Q85 48 80 52"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Stethoscope earpieces */}
        <circle cx="20" cy="25" r="4" fill="currentColor" />
        <circle cx="80" cy="25" r="4" fill="currentColor" />
        
        {/* Stethoscope chest piece */}
        <circle cx="50" cy="80" r="8" fill="currentColor" />
        <circle cx="50" cy="80" r="5" fill="white" />
        <circle cx="50" cy="80" r="2" fill="currentColor" />
        
        {/* Connecting tubes to chest piece */}
        <path
          d="M20 52 Q35 65 42 75"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        <path
          d="M80 52 Q65 65 58 75"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Small health pulse line */}
        <path
          d="M30 15 L32 12 L34 18 L36 8 L38 20 L40 15"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        
        <path
          d="M60 15 L62 12 L64 18 L66 8 L68 20 L70 15"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}