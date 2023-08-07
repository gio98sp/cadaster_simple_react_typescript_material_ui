import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Toolbar } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';

export const ListOfCities = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  return (
    <LayoutBaseDePagina
      title="Listagem de Cidades"
      toolbar={
        <Toolbar
          textNewButton="Nova"
          showSearchInput
          searchText={busca}
          changeSearchText={(text) => setSearchParams({ busca: text }, { replace: true })}
        />
      }
    ></LayoutBaseDePagina>
  );
};
