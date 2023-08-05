import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/Dashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
