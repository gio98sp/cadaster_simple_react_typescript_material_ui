import { Button } from '@mui/material';

import { useDrawerContext } from '../../shared/contexts';

export const Dashboard = () => {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <div>
      Dashboard
      <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
        Teste
      </Button>
    </div>
  );
};
