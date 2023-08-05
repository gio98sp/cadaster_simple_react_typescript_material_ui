import { Button } from '@mui/material';

import { useAppThemeContext } from '../../shared/contexts';

export const Dashboard = () => {
  const { toggleTheme } = useAppThemeContext();

  return (
    <div>
      Dashboard
      <Button variant="contained" color="primary" onClick={toggleTheme}>
        Teste
      </Button>
    </div>
  );
};
