import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaSearch, FaHeart, FaUtensils, FaBookOpen, FaArrowRight } from 'react-icons/fa';
import RecipeCard from '../components/RecipeCard';
import { featuredRecipes, allRecipes } from '../data/mockRecipes';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Get search query from URL
  const searchQuery = searchParams.get('search') || '';

  // Effect to handle search when URL changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const performSearch = () => {
      if (searchQuery.trim()) {
        try {
          setLoading(true);
          setError(null);
          
          // Search in mock data
          const results = allRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.summary.toLowerCase().includes(searchQuery.toLowerCase())
          );

          setSearchResults(results);
          setLoading(false);
        } catch (err) {
          console.error('Error searching recipes:', err);
          setError('Something went wrong. Please try again.');
          setLoading(false);
        }
      } else {
        // Clear results when search query is empty
        setSearchResults(null);
      }
    };

    performSearch();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search').trim();
    
    if (query) {
      // Update URL with search query
      setSearchParams({ search: query });
    } else {
      // Clear search params if query is empty
      setSearchParams({});
    }
  };

  const handleViewAllRecipes = () => {
    navigate('/all-recipes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Discover <span className="text-blue-600">Delicious</span> Recipes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find and save your favorite recipes from our collection of delicious meals
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                name="search"
                placeholder="Search for recipes..."
                defaultValue={searchQuery}
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaSearch className="inline mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Search Results Section */}
      {searchQuery && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results for "{searchQuery}"
              </h2>
            </div>
            
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-12">{error}</div>
            ) : searchResults?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                No recipes found. Try a different search term.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Recipes Section */}
      {!searchQuery && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
              <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-left">Featured Recipes</h2>
              <button
                onClick={handleViewAllRecipes}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                View All Recipes
                <FaArrowRight className="text-sm" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <FaUtensils className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy to Cook</h3>
              <p className="text-gray-600">Step-by-step instructions for perfect results</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <FaHeart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
              <p className="text-gray-600">Keep your favorite recipes in one place</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <FaBookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Thousands of recipes to choose from</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
