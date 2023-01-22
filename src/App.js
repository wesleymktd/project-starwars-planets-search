import './App.css';
import Filters from './components/Filters';
import FilterSearch from './components/FilterSearch';
import Table from './components/Table';

function App() {
  return (
    <>
      <h3>Projeto Star Wars - Trybe</h3>
      <FilterSearch />
      <Filters />
      <Table />
    </>
  );
}

export default App;
