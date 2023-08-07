import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Toolbar } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import {
  IListagemPessoa,
  PessoasService,
} from '../../shared/services/api/pessoas/PessoasService';

export const ListOfPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, settotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
          settotalCount(result.totalCount);
          setRows(result.data);
        }
      });
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
    >
      <TableContainer component={Paper} variant={'outlined'} sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell></TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
