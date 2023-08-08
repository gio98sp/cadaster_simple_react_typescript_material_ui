import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DetailsOfPeople, ListOfPeople } from '../pages';
import { Dashboard } from '../pages/dashboard/Dashboard';
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
      
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
