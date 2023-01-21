import { createContext, useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const ListPlanetsContext = createContext();

function ListPlanetsProvider({ children }) {
  const { planets, error, isLoading } = useFetch();
  const [showPlanets, setShowPlanets] = useState([]);
  const [searchByName, setSearchByName] = useState([]);

  const searchPlanetsByName = () => {
    if (searchByName.length === 0) {
      setShowPlanets(planets);
    } else {
      const resultFilt = planets
        .filter((result) => result.name.toUpperCase()
          .includes(searchByName.toUpperCase()));
      setShowPlanets(resultFilt);
    }
  };

  useEffect(() => {
    searchPlanetsByName();
  }, [planets, searchByName]);

  const values = useMemo(() => ({
    showPlanets, error, isLoading, setSearchByName,
  }), [showPlanets, error, isLoading]);

  return (
    <ListPlanetsContext.Provider value={ values }>
      { children }
    </ListPlanetsContext.Provider>

  );
}

ListPlanetsProvider.propTypes = {}.isRequired;

export default ListPlanetsProvider;
