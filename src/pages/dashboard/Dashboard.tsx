import { Toolbar } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina title="Página inicial" toolbar={<Toolbar showSearchInput textNewButton='Nova' />}>

    </LayoutBaseDePagina>
  );
};
