import React, { useState } from 'react';
import axios from 'axios';

const TestApi = () => {
  const [result, setResult] = useState('Click button to test API');

  const testApi = async () => {
    setResult('Testing...');
    try {
      const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
      setResult(`API Key: ${apiKey ? 'Present' : 'Missing'}`);

      const response = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          params: {
            apiKey,
            number: 1
          }
        }
      );

      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}\n${JSON.stringify(error.response?.data, null, 2)}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-xl max-w-md">
      <button
        onClick={testApi}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test API
      </button>
      <pre className="text-xs whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {result}
      </pre>
    </div>
  );
};

export default TestApi;
