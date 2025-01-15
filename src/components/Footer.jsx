import React from 'react';

const Footer = ({ className }) => (
  <footer className={`bg-gray-800 text-white py-4 ${className}`}>
    <div className="container mx-auto px-4 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Recipe Finder. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;