import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MealPlannerPage from './pages/MealPlannerPage';
import AllRecipes from './pages/AllRecipes';
import RecipeDetails from './pages/RecipeDetails';
import './App.css'; // Import main CSS file

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Home />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/favorites",
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Favorites />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/meal-planner",
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <MealPlannerPage />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/all-recipes",
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AllRecipes />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/recipes",
    element: <Navigate to="/all-recipes" replace />,
  },
  {
    path: "/recipe/:id",
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <RecipeDetails />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
