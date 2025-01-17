import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allRecipes } from '../data/mockRecipes';

const SearchBar = () => {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem('lastSearchQuery') || '';
  });
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('lastSearchResults');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Filter recipes based on search query
      const filteredRecipes = allRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );

      setRecipes(filteredRecipes);
      localStorage.setItem('lastSearchQuery', query);
      localStorage.setItem('lastSearchResults', JSON.stringify(filteredRecipes));

      // Navigate to search results
      navigate('/all-recipes', { state: { recipes: filteredRecipes } });
    } catch (err) {
      setError('Error searching recipes');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (e, recipe) => {
    e.stopPropagation();
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== recipe.id);
    } else {
      newFavorites = [...favorites, recipe];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const clearSearch = () => {
    setQuery('');
    setRecipes([]);
    localStorage.removeItem('lastSearchResults');
    localStorage.removeItem('lastSearchQuery');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8 px-4">
        <input
          type="text"
          placeholder="Search recipes (e.g., pasta, chicken, vegetarian)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-500"
        />
        <div className="flex gap-2">
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Clear
            </button>
          )}
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Recipes'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Searching for recipes...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center text-red-600 mb-8 px-4">
          <p>{error}</p>
        </div>
      )}

      {recipes.length > 0 && (
        <div className="mb-4 px-4">
          <p className="text-gray-600">
            Showing results for "{query}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <div className="h-48 relative">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => toggleFavorite(e, recipe)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  isFavorite(recipe.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600'
                } hover:scale-110 transition-all duration-200 shadow-md`}
                aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  className="w-6 h-6"
                  fill={isFavorite(recipe.id) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {recipe.title}
              </h3>
              <p className="text-sm text-blue-600 mt-2 hover:text-blue-700">
                Click to view details
              </p>
            </div>
          </div>
        ))}
      </div>

      {recipes.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 py-8">
          <p>Start searching for recipes above!</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
