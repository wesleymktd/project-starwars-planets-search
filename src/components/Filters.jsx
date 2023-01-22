import { useContext, useState } from 'react';
import { ListPlanetsContext } from '../context/ListPlanetsProvider';

function Filters() {
  const { filterByNumber } = useContext(ListPlanetsContext);
  const [filtNumber, setFiltNumber] = useState({
    columFilt: 'population',
    compared: 'maior que',
    numberFilt: 0,
  });

  const handleChange = ({ target }) => {
    setFiltNumber({
      ...filtNumber,
      [target.name]: target.value,
    });
  };

  const buttonFiltNumber = () => {
    filterByNumber(filtNumber);
    setFiltNumber({
      columFilt: 'population',
      compared: 'maior que',
      numberFilt: 0,
    });
  };

  return (
    <div>
      <label htmlFor="columFilt">
        Coluna
        <select
          className="select-filters"
          name="columFilt"
          id="columFilt"
          data-testid="column-filter"
          value={ filtNumber.columFilt }
          onChange={ handleChange }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="compared">
        Operador
        <select
          className="select-filters"
          name="compared"
          id="compared"
          data-testid="comparison-filter"
          value={ filtNumber.compared }
          onChange={ handleChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        className="input-filter"
        name="numberFilt"
        id="numberFilt"
        type="number"
        data-testid="value-filter"
        onChange={ handleChange }
        value={ filtNumber.numberFilt }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ buttonFiltNumber }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
