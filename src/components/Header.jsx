import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({ className }) => (
  <header className={`bg-blue-600 text-white shadow-md ${className}`}>
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Recipe Finder</h1>
      <nav className="space-x-6">
        <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
        <Link to="/favorites" className="hover:text-blue-200 transition-colors">Favorites</Link>
        <Link to="/meal-planner" className="hover:text-blue-200 transition-colors">Meal Planner</Link>
      </nav>
    </div>
  </header>
);

export default Header;
