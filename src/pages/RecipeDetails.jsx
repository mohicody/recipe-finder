import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: 'e7a967127e3746ffac1ce1473af76d3d'
            }
          }
        );
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
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
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
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
            <div 
              className="text-gray-600 space-y-4"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
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
