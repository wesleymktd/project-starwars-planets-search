import { useState } from 'react';

function useFetch() {
  const [error, setError] = useState(null);
  // const [planets, setPlanet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { makeFetch, error, isLoading };
}

export default useFetch;
