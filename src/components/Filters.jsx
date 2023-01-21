import { useState, useContext } from 'react';
import { ListPlanetsContext } from '../context/ListPlanetsProvider';

function Filters() {
  const { setSearchByName } = useContext(ListPlanetsContext);
  const [searchNameInputs, setSearchNameInputs] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSearchNameInputs(value);
    setSearchByName(value);
  };

  return (
    <div>
      <input
        type="text"
        name="searchNameInputs"
        data-testid="name-filter"
        value={ searchNameInputs }
        onChange={ handleChange }
      />
    </div>
  );
}

export default Filters;
