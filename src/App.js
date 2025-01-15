import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MealPlannerPage from './pages/MealPlannerPage';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';
import './App.css'; // Import main CSS file


const App = () => {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col relative">
        <Header className="fixed top-0 left-0 right-0 z-50" />
        <main className="flex-grow mt-16 mb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meal-planner" element={<MealPlannerPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
        <Footer className="fixed bottom-0 left-0 right-0 z-50" />
      </div>
    </Router>
  );
};

export default App;
