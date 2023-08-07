import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Toolbar } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const ListOfPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    PessoasService.getAll(1, busca)
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      title="Listagem de Pessoas"
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
