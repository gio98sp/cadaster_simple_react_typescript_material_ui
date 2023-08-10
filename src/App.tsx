import { BrowserRouter } from 'react-router-dom';
import './shared/forms/TraductionYup';

import { AppRoutes } from './routes';
import { Login, Sidebar } from './shared/components';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <Sidebar>
                <AppRoutes />
              </Sidebar>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
