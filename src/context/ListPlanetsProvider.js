import { createContext, useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const ListPlanetsContext = createContext();

function ListPlanetsProvider({ children }) {
  const { planets, error, isLoading } = useFetch();
  const [showPlanets, setShowPlanets] = useState([]);
  const [searchByName, setSearchByName] = useState([]);
  const [columFiltOptions, setColumFiltOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filtCompared, setFiltCompared] = useState([]);

  const [sort, setSort] = useState({
    columOrd: 'population',
    ordened: '',
  });

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

  const filterByNumberClick = ({ columFilt, compared, numberFilt }) => {
    if (compared === 'maior que') {
      const filt1 = showPlanets
        .filter((planet) => +(planet[columFilt]) > +(numberFilt));
      setShowPlanets(filt1);
    }
    if (compared === 'menor que') {
      const filt1 = showPlanets
        .filter((planet) => +(planet[columFilt]) < +(numberFilt));
      setShowPlanets(filt1);
    }
    if (compared === 'igual a') {
      const filt1 = showPlanets
        .filter((planet) => +(planet[columFilt]) === +(numberFilt));
      setShowPlanets(filt1);
    }
    const newColumOptions = columFiltOptions.filter((option) => option !== columFilt);
    setColumFiltOptions(newColumOptions);

    setFiltCompared([...filtCompared, { columFilt, compared, numberFilt }]);
  };

  // eu tenho um array de filtros eu preciso que ele sempre mude sempre que o array é
  // alterado, através de userEfeect
  // para cada filtro dentro do arrai tenho que chamar minha função de filtro
  // para cada item do meu array eu passo pela função do filterBuNumbe

  const updatePlanetsAndFilt = ({ columFilt,
    compared, numberFilt }, showPlan = []) => {
    if (compared === 'maior que') {
      const filt1 = showPlan
        .filter((planet) => +(planet[columFilt]) > +(numberFilt));
      setShowPlanets(filt1);
    }
    if (compared === 'menor que') {
      const filt1 = showPlan
        .filter((planet) => +(planet[columFilt]) < +(numberFilt));
      setShowPlanets(filt1);
    }
    if (compared === 'igual a') {
      const filt1 = showPlan
        .filter((planet) => +(planet[columFilt]) === +(numberFilt));
      setShowPlanets(filt1);
    }
  };

  const filterRemoveColum = (columFilt, updateFiltCompared) => {
    setColumFiltOptions([...columFiltOptions, columFilt]);
    setFiltCompared(updateFiltCompared);
  };

  const removeFilterClick = (columFilt) => {
    setShowPlanets(planets);
    const updateFiltCompared = filtCompared
      .filter((filt) => filt.columFilt !== columFilt);
    filterRemoveColum(columFilt, updateFiltCompared);
  };

  const handleFiltersRemoveAll = () => {
    setShowPlanets(planets);
    setColumFiltOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
    setFiltCompared([]);
  };

  const handleOrdened = ({ target: { name, value } }) => {
    setSort({
      ...sort,
      [name]: value,
    });
  };

  const filtButtonSort = () => {
    const filtWithUnknown = showPlanets
      .filter((planet) => planet[sort.columOrd] === 'unknown');
    const filtNotUnknown = showPlanets
      .filter((planet) => planet[sort.columOrd] !== 'unknown');
    if (sort.ordened === 'ASC') {
      filtNotUnknown.sort((a, b) => a[sort.columOrd] - b[sort.columOrd]);
    } else {
      filtNotUnknown.sort((a, b) => b[sort.columOrd] - a[sort.columOrd]);
    }
    const updateSortArray = [...filtNotUnknown, ...filtWithUnknown];
    setShowPlanets(updateSortArray);
  };

  useEffect(() => {
    filtCompared.forEach((filtersUsed) => {
      updatePlanetsAndFilt(filtersUsed, showPlanets);
    });
  }, [filtCompared]);

  useEffect(() => {
    searchPlanetsByName();
  }, [planets, searchByName]);

  const values = useMemo(() => ({
    showPlanets,
    error,
    isLoading,
    filtCompared,
    setSearchByName,
    removeFilterClick,
    filterByNumberClick,
    handleFiltersRemoveAll,
    columFiltOptions,
    handleOrdened,
    sort,
    filtButtonSort,
  }), [showPlanets, error, isLoading,
    columFiltOptions, setSearchByName, filtCompared, sort]);

  return (
    <ListPlanetsContext.Provider value={ values }>
      { children }
    </ListPlanetsContext.Provider>

  );
}

ListPlanetsProvider.propTypes = {}.isRequired;

export default ListPlanetsProvider;
