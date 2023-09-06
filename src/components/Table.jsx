import React, { useContext } from 'react';
import { ListPlanetsContext } from '../context/ListPlanetsProvider';
import '../App.css';

function Table() {
  const { showPlanets, isLoading } = useContext(ListPlanetsContext);
  return (
    <div>
      {isLoading && <h3>Carregando...</h3>}
      <table className="table">
        <thead className="table-thered">
          <tr className="table-tr-thered">
            <th className="table-0 table-th">Name</th>
            <th className="table-1 table-th">Rotation Period</th>
            <th className="table-2 table-th">Orbital Period</th>
            <th className="table-3 table-th">Diameter</th>
            <th className="table-4 table-th">Climate</th>
            <th className="table-5 table-th">Gravity</th>
            <th className="table-6 table-th">Terrain</th>
            <th className="table-7 table-th">Surface Water</th>
            <th className="table-8 table-th">Population</th>
            <th className="table-9 table-th">Films</th>
            <th className="table-10 table-th">Created</th>
            <th className="table-11 table-th">Edited</th>
            <th className="table-12 table-th">URL</th>
          </tr>
        </thead>
        <tbody className="table-tbody">
          {showPlanets.map((planet) => (
            <tr key={ planet.name } className="table-column">
              <td
                data-testid="planet-name"
                className="table-tbody-name"
              >
                {planet.name}
              </td>
              <td className="table-tbody-rotation_period">{planet.rotation_period}</td>
              <td className="table-tbody-orbital_period">{planet.orbital_period}</td>
              <td className="table-tbody-diameter">{planet.diameter}</td>
              <td className="table-tbody-climate">{planet.climate}</td>
              <td className="table-tbody-gravity">{planet.gravity}</td>
              <td className="table-tbody-terrain">{planet.terrain}</td>
              <td className="table-tbody-surface_water">{planet.surface_water}</td>
              <td className="table-tbody-population">{planet.population}</td>
              <td className="table-film">{planet.films}</td>
              <td className="table-tbody-created">{planet.created}</td>
              <td className="table-tbody-edited">{planet.edited}</td>
              <td className="table-tbody-url">{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
