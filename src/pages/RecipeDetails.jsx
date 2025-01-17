import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../data/mockRecipes';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const recipeData = getRecipeById(id);
      if (recipeData) {
        setRecipe(recipeData);
        // Check if recipe is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
      } else {
        setError('Recipe not found');
      }
    } catch (err) {
      setError('Failed to load recipe details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== recipe.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 w-6 h-6" />
            ) : (
              <FaRegHeart className="text-gray-500 w-6 h-6" />
            )}
          </button>
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <span className="font-medium">Ready in:</span>
              <span className="ml-2">{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium">Servings:</span>
              <span className="ml-2">{recipe.servings}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Summary</h2>
            <p className="text-gray-600">{recipe.summary}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="text-gray-600">
                  {ingredient.original}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <div className="text-gray-600 space-y-4">
              {recipe.instructions.split('\n').map((instruction, index) => (
                instruction.trim() && (
                  <p key={index} className="ml-4">
                    {instruction.trim()}
                  </p>
                )
              ))}
            </div>
          </div>

          {recipe.diets && recipe.diets.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Dietary Information</h2>
              <div className="flex flex-wrap gap-2">
                {recipe.diets.map((diet) => (
                  <span 
                    key={diet}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {diet}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
