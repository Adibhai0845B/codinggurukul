import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Logo image as a loading screen */}
        <img 
          src="/logo.png" 
          alt="Loading..." 
          className="w-20 h-20 animate-pulse" 
        />
        <p className="mt-4 text-gray-600 font-medium">Authenticating...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;