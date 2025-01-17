import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`bg-blue-600 text-white shadow-lg mb-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-100">
            Recipe Finder
          </Link>
          
          {/* Hamburger menu button for mobile */}
          <button 
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-lg transition-colors ${
                isActive('/') 
                  ? 'text-white font-semibold'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/all-recipes"
              className={`text-lg transition-colors ${
                isActive('/all-recipes')
                  ? 'text-white font-semibold'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Recipes
            </Link>
            <Link
              to="/favorites"
              className={`text-lg transition-colors ${
                isActive('/favorites')
                  ? 'text-white font-semibold'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Favorites
            </Link>
            <Link
              to="/meal-planner"
              className={`text-lg transition-colors ${
                isActive('/meal-planner')
                  ? 'text-white font-semibold'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Meal Planner
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-lg py-2 px-4 rounded transition-colors ${
                  isActive('/')
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/all-recipes"
                className={`text-lg py-2 px-4 rounded transition-colors ${
                  isActive('/all-recipes')
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Recipes
              </Link>
              <Link
                to="/favorites"
                className={`text-lg py-2 px-4 rounded transition-colors ${
                  isActive('/favorites')
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
              <Link
                to="/meal-planner"
                className={`text-lg py-2 px-4 rounded transition-colors ${
                  isActive('/meal-planner')
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Meal Planner
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
