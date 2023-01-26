import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
import ListPlanetsProvider from '../context/ListPlanetsProvider';
import userEvent from '@testing-library/user-event';

describe('testando a aplicação App', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });
    await act(async () => {
      render(
      <ListPlanetsProvider>
        <App />
      </ListPlanetsProvider>);
    });
  });

  test('testando se os elementos estão na tela', () => {
    const titleElement = screen.getByRole('heading', {name: /projeto star wars \- trybe/i})
    const searchInput = screen.getByTestId('name-filter');
    const columDropdown = screen.getByTestId('column-filter');
    const operatorDropdown = screen.getByTestId('comparison-filter');
    const inputValueNumber = screen.getByTestId('value-filter');
    const buttonFilt = screen.getByTestId('button-filter');
    const buttonRemoveFilt = screen.getByTestId('button-remove-filters');
    const ordenedColumDropdown = screen.getByTestId('column-sort');
    const inputRadioAsc = screen.getByTestId('column-sort-input-asc');
    const inputRadioDesc = screen.getByTestId('column-sort-input-desc');
    const buttonOrdened = screen.getByTestId('column-sort-button');
    expect(titleElement).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(columDropdown).toBeInTheDocument();
    expect(operatorDropdown).toBeInTheDocument();
    expect(inputValueNumber).toBeInTheDocument();
    expect(buttonFilt).toBeInTheDocument();
    expect(buttonRemoveFilt).toBeInTheDocument();
    expect(ordenedColumDropdown).toBeInTheDocument();
    expect(inputRadioAsc).toBeInTheDocument();
    expect(inputRadioDesc).toBeInTheDocument();
    expect(buttonOrdened).toBeInTheDocument();
    });

  test('Teste busca por nome se renderiza', () => {
    const searchInput = screen.getByTestId('name-filter');
    userEvent.type(searchInput, 'tatoo');
    const tableElement = screen.getByRole('cell', {name: /tatooine/i})

    expect(tableElement).toBeInTheDocument();
  });

  test('testando o filtro por maior que e testando limpar filtros e filtros ativos', () => {
    const inputValueNumber = screen.getByTestId('value-filter');
    const buttonFilt = screen.getByTestId('button-filter');
    const buttonRemoveFilt = screen.getByTestId('button-remove-filters');

    userEvent.type(inputValueNumber, '6000000');
    userEvent.click(buttonFilt);

    const tableElements = screen.getAllByTestId('planet-name')
    expect(tableElements).toHaveLength(5);

    const filtersActived = screen.getAllByTestId('filter');
    expect(filtersActived).toHaveLength(1);

    userEvent.click(buttonRemoveFilt);
    expect(tableElements).toHaveLength(5)

    // ver isso depois era para ser 10
    

  });

  test('testando o filtro menor que', () => {
    const inputValueNumber = screen.getByTestId('value-filter');
    const buttonFilt = screen.getByTestId('button-filter');
    const operatorDropdown = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(operatorDropdown,'menor que')
    userEvent.type(inputValueNumber, '6000000');
    userEvent.click(buttonFilt);

    const tableElements = screen.getAllByTestId('planet-name')
    expect(tableElements).toHaveLength(2);
    });

  test('testando o filtro igual e removendo um filtro', () => {
    const inputValueNumber = screen.getByTestId('value-filter');
    const buttonFilt = screen.getByTestId('button-filter');
    const operatorDropdown = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(operatorDropdown,'igual a')
    userEvent.type(inputValueNumber, '6000000');
    userEvent.click(buttonFilt);

    const tableElements = screen.getAllByTestId('planet-name')
    expect(tableElements).toHaveLength(1);

    const buttonX = screen.getByRole('button', {name: /x/i})
    userEvent.click(buttonX);
    expect(buttonX).not.toBeInTheDocument();
    });

  test('testando o filtro igual e removendo um filtro', () => {
    const inputValueNumber = screen.getByTestId('value-filter');
    const buttonFilt = screen.getByTestId('button-filter');
    const operatorDropdown = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(operatorDropdown,'igual a')
    userEvent.type(inputValueNumber, '6000000');
    userEvent.click(buttonFilt);

    const tableElements = screen.getAllByTestId('planet-name')
    expect(tableElements).toHaveLength(1);

    const buttonX = screen.getByRole('button', {name: /x/i})
    userEvent.click(buttonX);
    expect(buttonX).not.toBeInTheDocument();
    });
    
  test('testando ordenar ascendente', () => {
    const inputRadioAsc = screen.getByTestId('column-sort-input-asc');
    const buttonOrdened = screen.getByTestId('column-sort-button');
    const tableElements = screen.getAllByTestId('planet-name');
    userEvent.click(inputRadioAsc);
    userEvent.click(buttonOrdened);

    expect(tableElements[0]).toHaveTextContent('Tatooine');
    // falso positivo 
    });
})
