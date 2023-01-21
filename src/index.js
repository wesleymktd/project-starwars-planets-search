import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ListPlanetsProvider from './context/ListPlanetsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ListPlanetsProvider>
      <App />
    </ListPlanetsProvider>,
  );
