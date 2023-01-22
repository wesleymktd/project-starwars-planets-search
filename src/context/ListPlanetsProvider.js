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

  const filterByNumber = ({ columFilt, compared, numberFilt }) => {
    if (compared === 'maior que') {
      const filt1 = showPlanets
        .filter((planet) => +(planet[columFilt]) > +(numberFilt));
      setShowPlanets(filt1);
      console.log(filt1);
    }
    if (compared === 'menor que') {
      const filt1 = showPlanets
        .filter((planet) => +(planet[columFilt]) < +(numberFilt));
      setShowPlanets(filt1);
      console.log(filt1);
    }
    if (compared === 'igual a') {
      const filt1 = showPlanets
        .filter((planet) => +(planet[columFilt]) === +(numberFilt));
      setShowPlanets(filt1);
      console.log(filt1);
    }
  };

  useEffect(() => {
    searchPlanetsByName();
  }, [planets, searchByName]);

  const values = useMemo(() => ({
    showPlanets, error, isLoading, setSearchByName, filterByNumber,
  }), [showPlanets, error, isLoading]);

  return (
    <ListPlanetsContext.Provider value={ values }>
      { children }
    </ListPlanetsContext.Provider>

  );
}

ListPlanetsProvider.propTypes = {}.isRequired;

export default ListPlanetsProvider;
