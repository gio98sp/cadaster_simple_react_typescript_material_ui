import { useNavigate, useParams } from 'react-router-dom';

import { ToolbarDetails } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';

export const DetailsOfPeople = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate()

  const handleSave = () => {
    console.log('Save')
  }

  const handleSaveAndBack = () => {
    console.log('Save and back')
  }

  const handleDelete = () => {
    console.log('Delete')
  }

  return (
    <LayoutBaseDePagina
      title="Detalhe de Pessoa"
      toolbar={
        <ToolbarDetails
          textNewButton="Nova"
          showSaveAndBackButton
          showDeleteButton={id !== 'nova'}
          showNewButton={id !== 'nova'}

          handleClickSaveButton={handleSave}
          handleClickSaveAndBackButton={handleSaveAndBack}
          handleClickDeleteButton={handleDelete}
          handleClickNewButton={() => navigate('/pessoas/detalhe/nova')}
          handleClickBackButton={() => navigate('/pessoas')}
        />
      }
    >
      <p>test</p>
    </LayoutBaseDePagina>
  );
};
