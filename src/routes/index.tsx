import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { ListOfCities } from '../pages';

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
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path='/cidades' element={<ListOfCities />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
