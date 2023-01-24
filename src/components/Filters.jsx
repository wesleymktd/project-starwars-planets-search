import { useContext, useState } from 'react';
import { ListPlanetsContext } from '../context/ListPlanetsProvider';

function Filters() {
  const [filtNumber, setFiltNumber] = useState({
    columFilt: 'population',
    compared: 'maior que',
    numberFilt: 0,
  });

  const {
    filterByNumberClick, columFiltOptions, filtCompared,
    removeFilterClick, handleFiltersRemoveAll, filtButtonSort, handleOrdened, sort,
  } = useContext(ListPlanetsContext);

  const handleChange = ({ target }) => {
    setFiltNumber({
      ...filtNumber,
      [target.name]: target.value,
    });
  };

  const buttonFiltNumber = () => {
    filterByNumberClick(filtNumber);
    setFiltNumber({
      columFilt: columFiltOptions[0],
      compared: 'maior que',
      numberFilt: 0,
    });
  };

  const handleRemove = ({ target: { name: columFilt } }) => {
    removeFilterClick(columFilt);
    setFiltNumber({
      columFilt: columFiltOptions[columFiltOptions.lenght - 1],
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
          {columFiltOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
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
      <button
        type="button"
        onClick={ handleFiltersRemoveAll }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
      <br />
      <ul>
        {filtCompared.lenght !== 0
      && filtCompared.map(({ columFilt, compared, numberFilt }, i) => (
        <li data-testid="filter" key={ i }>
          <p>{`${columFilt} ${compared} ${numberFilt}`}</p>
          <button
            type="button"
            name={ columFilt }
            onClick={ handleRemove }
          >
            X
          </button>
        </li>
      ))}
      </ul>
      <label htmlFor="colum-ordened">
        Ordenar
        <select
          className="select-filters"
          name="columOrd"
          id="colum-ordened"
          data-testid="column-sort"
          value={ sort.columOrd }
          onChange={ handleOrdened }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>

      <label htmlFor="orderFilt">
        Ascendente
        <input
          className="orderFilt"
          name="ordened"
          id="orderFilt"
          type="radio"
          data-testid="column-sort-input-asc"
          onChange={ handleOrdened }
          value="ASC"
        />
      </label>
      <label htmlFor="order-Filt">
        Descendente
        <input
          className="orderFilt"
          name="ordened"
          id="order-Filt"
          type="radio"
          data-testid="column-sort-input-desc"
          onChange={ handleOrdened }
          value="DESC"
        />
      </label>

      <button
        type="button"
        onClick={ filtButtonSort }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </div>
  );
}

export default Filters;
