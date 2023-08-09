import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

import { Sidebar } from './shared/components';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import './shared/forms/TraductionYup'

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
