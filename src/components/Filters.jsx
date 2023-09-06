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
    console.log(columFilt);
    removeFilterClick(columFilt);
    setFiltNumber({
      columFilt: columFiltOptions[columFiltOptions.lenght - 1],
      compared: 'maior que',
      numberFilt: 0,
    });
  };

  return (
    <div className="table-div-filters">
      <label htmlFor="columFilt">
        <p className="tabble-column-select-label">Coluna</p>
        <select
          className="table-column-select"
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
        <p className="tabble-column-select-label">Operador</p>
        <select
          className="table-column-select"
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
        className="table-input-number"
        name="numberFilt"
        id="numberFilt"
        type="number"
        data-testid="value-filter"
        onChange={ handleChange }
        value={ filtNumber.numberFilt }
      />
      <button
        type="button"
        className="table-filter-button"
        data-testid="button-filter"
        onClick={ buttonFiltNumber }
      >
        Filtrar
      </button>
      <label htmlFor="colum-ordened">
        <p className="tabble-column-select-label">Ordenar</p>
        <select
          className="table-column-select"
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
      <div>
        <label htmlFor="orderFilt" className="table-div-radio">
          <input
            className="table-radio"
            name="ordened"
            id="orderFilt"
            type="radio"
            data-testid="column-sort-input-asc"
            onChange={ handleOrdened }
            value="ASC"
          />
          <p className="table-radio-name">Ascendente</p>
        </label>
        <label htmlFor="order-Filt" className="table-div-radio">
          <input
            className="table-radio"
            name="ordened"
            id="order-Filt"
            type="radio"
            data-testid="column-sort-input-desc"
            onChange={ handleOrdened }
            value="DESC"
          />
          <p className="table-radio-name">Descendente</p>
        </label>
      </div>
      <button
        type="button"
        className="table-filter-button"
        onClick={ filtButtonSort }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
      <div>
        {filtCompared.length !== 0
          && filtCompared.map(({ columFilt, compared, numberFilt }, i) => (
            <div data-testid="filter" key={ i }>
              <p className="table-remove-name">
                {`${columFilt} ${compared} ${numberFilt}`}
              </p>
              <button
                className="table-remove"
                type="button"
                name={ columFilt }
                onClick={ handleRemove }
              >
                X
              </button>
            </div>
          ))}
        <button
          type="button"
          className="table-remove-all"
          onClick={ handleFiltersRemoveAll }
          data-testid="button-remove-filters"
        >
          Remover Filtros
        </button>
      </div>
    </div>
  );
}

export default Filters;
