import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { FaClock, FaUsers } from 'react-icons/fa';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(recipe => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return (
      <PageLayout title="My Favorites">
        <div className="text-center">
          <p className="text-gray-600 mb-8">You haven't saved any recipes yet.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search Recipes
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="My Favorites">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{recipe.title}</h2>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <FaClock className="w-4 h-4 mr-1" />
                  <span>{recipe.readyInMinutes} mins</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="w-4 h-4 mr-1" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Recipe
                </Link>
                <button
                  onClick={() => removeFromFavorites(recipe.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Favorites;
