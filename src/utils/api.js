import axios from 'axios';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const testApiConnection = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/random`, {
      params: {
        apiKey: API_KEY,
        number: 1
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: {
        status: error.response?.status,
        message: error.message,
        details: error.response?.data
      }
    };
  }
};

export const getRandomRecipes = async (number = 6) => {
  try {
    const response = await axios.get(`${BASE_URL}/random`, {
      params: {
        apiKey: API_KEY,
        number
      }
    });
    return response.data.recipes;
  } catch (error) {
    throw error;
  }
};

export const searchRecipes = async (query, offset = 0, number = 12) => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        offset,
        number,
        addRecipeInformation: true
      }
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
