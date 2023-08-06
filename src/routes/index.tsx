import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/dashboard/Dashboard';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Página Inicial',
        path: '/dashboard',
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
