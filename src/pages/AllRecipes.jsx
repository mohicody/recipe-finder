import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { allRecipes } from '../data/mockRecipes';

const fallbackImage = 'https://via.placeholder.com/400x300?text=Recipe+Image';

const AllRecipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const recipesPerPage = 12;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRecipes = () => {
      try {
        setLoading(true);
        setError(null);
        const searchQuery = searchParams.get('search')?.toLowerCase();
        
        // Filter recipes based on search query
        let filteredRecipes = allRecipes;
        if (searchQuery) {
          filteredRecipes = allRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchQuery) ||
            recipe.summary.toLowerCase().includes(searchQuery)
          );
        }

        // Calculate pagination
        const startIndex = (currentPage - 1) * recipesPerPage;
        const endIndex = startIndex + recipesPerPage;
        const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
        
        setRecipes(paginatedRecipes);
        setTotalResults(filteredRecipes.length);
      } catch (err) {
        console.error('Error processing recipes:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    setCurrentPage(1); // Reset to first page when searching
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const totalPages = Math.ceil(totalResults / recipesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="py-8 sm:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-10">All Recipes</h1>
        
        {/* Search Form */}
        <div className="max-w-xl mx-auto">
          <div className="relative mt-4 sm:mt-6">
            <form onSubmit={handleSearch} className="flex justify-center">
              <input
                type="text"
                name="search"
                placeholder="Search recipes..."
                defaultValue={searchParams.get('search') || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} fallbackImage={fallbackImage} handleImageError={handleImageError} />
            ))}
          </div>

          {/* No Results Message */}
          {recipes.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No recipes found. Try a different search term.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-12 mb-8 px-4">
              <div className="flex w-full sm:w-auto justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-white border border-blue-500 text-blue-500 rounded-l-lg hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-white transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                
                <div className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white font-medium text-center min-w-[120px] text-sm sm:text-base">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-white border border-blue-500 text-blue-500 rounded-r-lg hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-white transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllRecipes;
