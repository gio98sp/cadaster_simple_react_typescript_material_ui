import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  Dashboard,
  DetailsOfCities,
  DetailsOfPeople,
  ListOfCities,
  ListOfPeople,
} from '../pages';

import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Página Inicial',
        path: '/pagina-inicial',
      },
      {
        icon: 'location_city',
        label: 'Cidades',
        path: '/cidades',
      },
      {
        icon: 'people',
        label: 'Pessoas',
        path: '/pessoas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListOfPeople />} />
      <Route path="/pessoas/detalhe/:id" element={<DetailsOfPeople />} />

      <Route path="/cidades" element={<ListOfCities />} />
      <Route path="/cidades/detalhe/:id" element={<DetailsOfCities />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
