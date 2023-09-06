import './App.css';
import Filters from './components/Filters';
import FilterSearch from './components/FilterSearch';
import Table from './components/Table';
import image from './image/Star_Wars_Logo.png';

function App() {
  return (
    <>
      <img src={ image } alt="star-wars logo" className="logo" />
      <div className="table-div-all-filters">
        <FilterSearch />
        <Filters />
      </div>
      <Table />
    </>
  );
}

export default App;
