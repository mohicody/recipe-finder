import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUsers, FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';

const RecipeCard = ({ recipe, fallbackImage, handleImageError }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(fav => fav.id === recipe.id);
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== recipe.id);
    } else {
      newFavorites = [...favorites, {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary
      }];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="relative">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
            <MdRestaurant className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 w-5 h-5" />
          ) : (
            <FaRegHeart className="text-gray-500 w-5 h-5" />
          )}
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
          {recipe.title}
        </h3>
        {recipe.summary && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {recipe.summary}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{recipe.readyInMinutes}m</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-1" />
            <span>{recipe.servings}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
