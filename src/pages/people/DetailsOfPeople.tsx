import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';

import { ToolbarDetails } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { VTextField } from '../../shared/forms';

export const DetailsOfPeople = () => {
  const { id = 'nova' } = useParams<'id'>();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setName(result.nomeCompleto);
          console.log(result);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log('Save');
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente apagar?')) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate('/pessoas');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      title={id === 'nova' ? 'Nova Pessoa' : name}
      toolbar={
        <ToolbarDetails
          textNewButton="Nova"
          showSaveAndBackButton
          showDeleteButton={id !== 'nova'}
          showNewButton={id !== 'nova'}
          handleClickSaveButton={handleSave}
          handleClickSaveAndBackButton={handleSave}
          handleClickDeleteButton={() => handleDelete(Number(id))}
          handleClickNewButton={() => navigate('/pessoas/detalhe/nova')}
          handleClickBackButton={() => navigate('/pessoas')}
        />
      }
    >

      <Form onSubmit={(data) => console.log(data)}>
        <VTextField name='nomeCompleto' />
        <button type="submit">Enviar</button>
      </Form>

    </LayoutBaseDePagina>
  );
};
