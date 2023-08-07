import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';

interface IToolbarDetailsProps {
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndBackButtonLoading?: boolean;

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

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndBackButtonLoading = false,

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
      {(showSaveButton && !showSaveButtonLoading) && (
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

      {showSaveButtonLoading && <Skeleton width={110} height={60} />}

      {(showSaveAndBackButton && !showSaveAndBackButtonLoading) && (
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

      {showSaveAndBackButtonLoading && <Skeleton width={180} height={60} />}

      {(showDeleteButton && !showDeleteButtonLoading) && (
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

      {showDeleteButtonLoading && <Skeleton width={110} height={60} />}

      {(showNewButton && !showNewButtonLoading) && (
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

      {showNewButtonLoading && <Skeleton width={110} height={60} />}

      <Divider variant="middle" orientation="vertical" />

      {(showBackButton && !showBackButtonLoading) && (
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

      {showBackButtonLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};
