import { useEffect, useState } from 'react';

function useFetch() {
  const [error, setError] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const filtPlanets = data.results;
      filtPlanets.forEach((plan) => delete plan.residents);
      setPlanets(filtPlanets);
    } catch (err) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    makeFetch('https://swapi.dev/api/planets');
  }, []);

  return { planets, error, isLoading };
}

export default useFetch;
