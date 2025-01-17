import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { FaTimes, FaUtensils, FaPlus, FaTrash } from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';
import { allRecipes } from '../data/mockRecipes';

const MealPlannerPage = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
  const initialMealPlan = days.reduce((acc, day) => ({ ...acc, [day]: mealTypes.reduce((acc, mealType) => ({ ...acc, [mealType]: null }), {}) }), {});
  const fallbackImage = 'https://via.placeholder.com/400x300?text=Recipe+Image';

  const [mealPlan, setMealPlan] = useState(() => {
    const savedMealPlan = localStorage.getItem('mealPlan');
    return savedMealPlan ? JSON.parse(savedMealPlan) : initialMealPlan;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  const handleAddMeal = (day, mealType) => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setShowModal(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    try {
      // Search in mock data
      const query = searchQuery.toLowerCase();
      const results = allRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        (recipe.summary && recipe.summary.toLowerCase().includes(query))
      ).slice(0, 6);
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecipe = (recipe) => {
    setMealPlan(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedMealType]: recipe
      }
    }));
    setShowModal(false);
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <PageLayout 
      title="Meal Planner"
      subtitle="Plan your meals for the week ahead with our easy-to-use meal planner."
    >
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {days.map((day) => (
            <div key={day} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">{day}</h3>
              {mealTypes.map((mealType) => (
                <div key={mealType} className="mb-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                    <FaUtensils className="w-3 h-3 mr-2 text-blue-500" />
                    {mealType}
                  </h4>
                  {mealPlan[day][mealType] ? (
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                      <div className="relative">
                        {mealPlan[day][mealType].image ? (
                          <img
                            src={mealPlan[day][mealType].image}
                            alt={mealPlan[day][mealType].title}
                            className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                            <MdRestaurant className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setMealPlan(prev => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                [mealType]: null
                              }
                            }));
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
                          aria-label="Remove meal"
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-3">
                        <h5 className="font-medium text-gray-800 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                          {mealPlan[day][mealType].title}
                        </h5>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <span className="mr-3">🕒 {mealPlan[day][mealType].readyInMinutes}m</span>
                          <span>👥 {mealPlan[day][mealType].servings} servings</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddMeal(day, mealType)}
                      className="w-full h-32 px-3 py-2.5 bg-white border-2 border-dashed border-gray-200 text-sm text-gray-400 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200 flex flex-col items-center justify-center gap-2 group"
                    >
                      <FaPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span>Add {mealType}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 m-4 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="pr-10">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                  Add {selectedMealType} for {selectedDay}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">Search and select a recipe to add to your meal plan</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-1.5 bg-gray-800 rounded-full transition-all duration-200 hover:bg-gray-700 hover:rotate-90"
                aria-label="Close modal"
              >
                <FaTimes className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for recipes..."
                  className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-[90px]"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto rounded-lg">
                {searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center gap-3 sm:gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-200 group"
                    onClick={() => handleSelectRecipe(recipe)}
                  >
                    {recipe.image && (
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base truncate">
                        {recipe.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Ready in {recipe.readyInMinutes} minutes
                      </p>
                    </div>
                  </div>
                ))}
                {searchResults.length === 0 && searchQuery && !loading && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm sm:text-base">No recipes found.</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">Try a different search term.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default MealPlannerPage;
