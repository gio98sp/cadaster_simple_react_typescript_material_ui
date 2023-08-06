import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IToolbarDetailsProps {
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  handleClickNewButton?: () => void;
  handleClickBackButton?: () => void;
  handleClickDeleteButton?: () => void;
  handleClickSaveButton?: () => void;
  handleClickSaveAndBackButton?: () => void;
}

export const ToolbarDetails = ({
  textNewButton = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  handleClickNewButton,
  handleClickBackButton,
  handleClickDeleteButton,
  handleClickSaveButton,
  handleClickSaveAndBackButton,
}: IToolbarDetailsProps) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      component={Paper}
      marginX={1}
      padding={1}
      paddingX={2}
      display={'flex'}
      gap={1}
      alignItems={'center'}
    >
      {showSaveButton && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={handleClickSaveButton}
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}

      {showSaveAndBackButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={handleClickSaveAndBackButton}
          startIcon={<Icon>save</Icon>}
        >
          Salvar e voltar
        </Button>
      )}

      {showDeleteButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={handleClickDeleteButton}
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}

      {showNewButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={handleClickNewButton}
          startIcon={<Icon>add</Icon>}
        >
          {textNewButton}
        </Button>
      )}

      <Divider variant="middle" orientation="vertical" />

      {showBackButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={handleClickBackButton}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
