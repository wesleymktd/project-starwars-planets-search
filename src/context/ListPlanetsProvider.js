// import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const ListPlanetsContext = createContext();

function ListPlanetsProvider({ children }) {
  const { makeFetch, error, isLoading } = useFetch();
  // console.log(planets);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const planetRequest = async (url) => {
      const fetchApi = await makeFetch(url);
      const filtPlanets = fetchApi.results;
      filtPlanets.forEach((plan) => delete plan.residents);
      setPlanets(filtPlanets);
      // console.log(filtPlanets);
    };
    planetRequest('https://swapi.dev/api/planets');
  }, []);

  const values = useMemo(() => ({
    planets, error, isLoading,
  }), [planets, error, isLoading]);

  return (
    <ListPlanetsContext.Provider value={ values }>
      { children }
    </ListPlanetsContext.Provider>

  );
}

ListPlanetsProvider.propTypes = {}.isRequired;

export default ListPlanetsProvider;
