import React, { useContext } from 'react';
import { ListPlanetsContext } from '../context/ListPlanetsProvider';

function Table() {
  const { showPlanets, isLoading } = useContext(ListPlanetsContext);
  return (
    <div className="table-container">
      {isLoading && <h3>Carregando...</h3>}
      <table className="table">
        <thead>
          <tr>
            <th className="table-title">Name</th>
            <th className="table-title">Rotation Period</th>
            <th className="table-title">Orbital Period</th>
            <th className="table-title">Diameter</th>
            <th className="table-title">Climate</th>
            <th className="table-title">Gravity</th>
            <th className="table-title">Terrain</th>
            <th className="table-title">Surface Water</th>
            <th className="table-title">Population</th>
            <th className="table-title">Films</th>
            <th className="table-title">Created</th>
            <th className="table-title">Edited</th>
            <th className="table-title">URL</th>
          </tr>
        </thead>
        <tbody>
          {showPlanets.map((planet) => (
            <tr key={ planet.name } className="container-table-elements">
              <td className="table-elements">{planet.name}</td>
              <td className="table-elements">{planet.rotation_period}</td>
              <td className="table-elements">{planet.orbital_period}</td>
              <td className="table-elements">{planet.diameter}</td>
              <td className="table-elements">{planet.climate}</td>
              <td className="table-elements">{planet.gravity}</td>
              <td className="table-elements">{planet.terrain}</td>
              <td className="table-elements">{planet.surface_water}</td>
              <td className="table-elements">{planet.population}</td>
              <td className="table-elements">{planet.films}</td>
              <td className="table-elements">{planet.created}</td>
              <td className="table-elements">{planet.edited}</td>
              <td className="table-elements">{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
