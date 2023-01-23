import { useContext, useState } from 'react';
import { ListPlanetsContext } from '../context/ListPlanetsProvider';

function Filters() {
  const { filterByNumber, columFiltOptions } = useContext(ListPlanetsContext);
  const [filtNumber, setFiltNumber] = useState({
    columFilt: columFiltOptions[0],
    compared: 'maior que',
    numberFilt: 0,
  });

  console.log(columFiltOptions);

  const handleChange = ({ target }) => {
    setFiltNumber({
      ...filtNumber,
      [target.name]: target.value,
    });
  };

  const buttonFiltNumber = () => {
    filterByNumber(filtNumber);
    setFiltNumber({
      columFilt: columFiltOptions[0],
      compared: 'maior que',
      numberFilt: 0,
    });
  };
  // fazer um maping nas options, onde são carregadas de forma dinâmica
  // criar um estado onde ele é alimentado com as informações do filtro atual. (eu já tenho esse estado)
  // ao clicar no filtro ela será re-renderizada novamente e em cada option
  // já adicona o buttom de excluir o filtro, onde vou implementar futuramente
  // a funcionalidade

  //   filterByNumericValues: [
  //     {
  //       column: 'population',
  //       comparison: 'maior que',
  //       value: '100000',
  //     },
  //     {
  //       column: 'diameter',
  //       comparison: 'menor que',
  //       value: '8000',
  //     }
  //   ]
  // }
  // na renderização desse objeto faço um template literal e renderizando também o botão de
  // excluir
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
    </div>
  );
}

export default Filters;
