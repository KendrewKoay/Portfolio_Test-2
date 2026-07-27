import React from 'react';

export const WeChatIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Larger speech bubble */}
    <path d="M10 15C5.5 15 2 12.1 2 8.5C2 4.9 5.5 2 10 2C14.5 2 18 4.9 18 8.5C18 9.7 17.5 10.8 16.7 11.8L17.5 14.5L14.7 13.7C13.3 14.5 11.7 15 10 15Z" />
    {/* Smaller speech bubble */}
    <path d="M14.5 12.5C17.5 12.5 20 14.6 20 17.2C20 18.2 19.6 19.1 19 19.8L19.5 21.6L17.5 21C16.6 21.6 15.6 21.9 14.5 21.9C11.5 21.9 9 19.8 9 17.2" />
    {/* Eyes for main bubble */}
    <circle cx="7" cy="8" r="0.8" fill="currentColor" />
    <circle cx="13" cy="8" r="0.8" fill="currentColor" />
    {/* Eyes for smaller bubble */}
    <circle cx="12.8" cy="17" r="0.6" fill="currentColor" />
    <circle cx="16.2" cy="17" r="0.6" fill="currentColor" />
  </svg>
);
