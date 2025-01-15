import React from 'react';
import SearchBar from '../components/SearchBar';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div className="relative min-h-screen">
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-5" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop')",
          minHeight: '100vh',
          backgroundAttachment: 'fixed'
        }}>
      </div>
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
              Find Delicious Recipes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover thousands of recipes from around the world. Search by ingredients, cuisine, or dietary preferences.
            </p>
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <SearchBar />
              </div>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-4">
                <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Easy Search</h3>
              <p className="text-gray-600 text-center">Find recipes by ingredients, cuisine type, or dietary restrictions</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-green-500 mb-4">
                <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Meal Planning</h3>
              <p className="text-gray-600 text-center">Plan your weekly meals with our easy-to-use meal planner</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-red-500 mb-4">
                <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Save Favorites</h3>
              <p className="text-gray-600 text-center">Save your favorite recipes for quick access later</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
