import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealPlannerPage = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
  const initialMealPlan = days.reduce((acc, day) => ({ ...acc, [day]: mealTypes.reduce((acc, mealType) => ({ ...acc, [mealType]: null }), {}) }), {});

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          query: searchQuery,
          apiKey: 'e7a967127e3746ffac1ce1473af76d3d',
          number: 6
        }
      });
      setSearchResults(response.data.results);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Weekly Meal Planner</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {days.map(day => (
          <div key={day} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b">{day}</h2>
            {mealTypes.map(mealType => (
              <div key={mealType} className="mb-4">
                <h3 className="text-gray-700 font-medium mb-2">{mealType}</h3>
                {mealPlan[day][mealType] ? (
                  <div className="bg-gray-50 p-3 rounded-lg relative">
                    <img
                      src={mealPlan[day][mealType].image}
                      alt={mealPlan[day][mealType].title}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800">{mealPlan[day][mealType].title}</p>
                    <button
                      onClick={() => {
                        setMealPlan(prev => ({
                          ...prev,
                          [day]: {
                            ...prev[day],
                            [mealType]: null
                          }
                        }));
                      }}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm font-medium shadow-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddMeal(day, mealType)}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    + Add Meal
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Recipe Search Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  Add {selectedMealType} for {selectedDay}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
              
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Search
                </button>
              </div>

              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchResults.map(recipe => (
                  <div
                    key={recipe.id}
                    className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSelectRecipe(recipe)}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800">{recipe.title}</p>
                  </div>
                ))}
              </div>

              {searchResults.length === 0 && !loading && searchQuery && (
                <p className="text-center text-gray-500 py-4">
                  No recipes found. Try a different search term.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlannerPage;
