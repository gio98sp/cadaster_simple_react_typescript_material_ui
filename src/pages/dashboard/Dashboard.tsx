import { Toolbar, ToolbarDetails } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      title="Página inicial"
      toolbar={<ToolbarDetails />}
    ></LayoutBaseDePagina>
  );
};
