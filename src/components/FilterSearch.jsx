import { useState, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ListPlanetsContext } from '../context/ListPlanetsProvider';

function FilterSearch() {
  const { setSearchByName } = useContext(ListPlanetsContext);
  const [searchNameInputs, setSearchNameInputs] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSearchNameInputs(value);
    setSearchByName(value);
  };

  return (
    <div className="div-input-icon">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        name="searchNameInputs"
        placeholder="Pesquise por planetas"
        className="table-input-text"
        data-testid="name-filter"
        value={ searchNameInputs }
        onChange={ handleChange }
      />
    </div>
  );
}

export default FilterSearch;
