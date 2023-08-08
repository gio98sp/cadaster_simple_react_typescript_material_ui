import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Toolbar } from '../../shared/components';
import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import {
  IListagemPessoa,
  PessoasService,
} from '../../shared/services/api/pessoas/PessoasService';

export const ListOfPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate()

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, settotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PessoasService.getAll(page, busca).then((result) => {
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
  }, [busca, page]);

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente apagar?')) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(oldRows => oldRows.filter(oldRow => oldRow.id !== id))
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      title="Listagem de Pessoas"
      toolbar={
        <Toolbar
          textNewButton="Nova"
          showSearchInput
          searchText={busca}
          clickNewButton={() => navigate('/pessoas/detalhe/nova')}
          changeSearchText={(text) =>
            setSearchParams({ busca: text, page: '1' }, { replace: true })
          }
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
                <TableCell>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}

            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => {
                      setSearchParams(
                        { busca, page: newPage.toString() },
                        { replace: true }
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
