import React from 'react';

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-24 pb-8 md:pb-12">
          {(title || subtitle) && (
            <div className="text-center mb-12 md:mb-16">
              {title && (
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
