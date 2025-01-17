import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [status, setStatus] = useState('Testing...');
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    const testApi = async () => {
      setStatus(`API Key: ${apiKey ? apiKey.substring(0, 5) + '...' : 'Not found'}`);
      
      if (!apiKey) {
        setStatus('Error: API key not found in environment variables');
        return;
      }

      try {
        const response = await axios.get(
          'https://api.spoonacular.com/recipes/random',
          {
            params: {
              apiKey: apiKey,
              number: 1
            }
          }
        );
        
        if (response.data && response.data.recipes) {
          setStatus('Success! API is working correctly');
        } else {
          setStatus('Error: Unexpected API response format');
        }
      } catch (error) {
        setStatus(`Error: ${error.response?.status} - ${error.message}`);
      }
    };

    testApi();
  }, [apiKey]);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="font-bold mb-2">API Status</h3>
      <p>{status}</p>
    </div>
  );
};

export default ApiTest;
