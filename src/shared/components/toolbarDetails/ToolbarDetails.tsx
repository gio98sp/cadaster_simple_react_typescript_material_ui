import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

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

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
      {showSaveButton && !showSaveButtonLoading && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={handleClickSaveButton}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            noWrap
            textOverflow={'ellipsis'}
            overflow={'hidden'}
          >
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && <Skeleton width={110} height={60} />}

      {showSaveAndBackButton && !showSaveAndBackButtonLoading && !mdDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={handleClickSaveAndBackButton}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            noWrap
            textOverflow={'ellipsis'}
            overflow={'hidden'}
          >
            Salvar e voltar
          </Typography>
        </Button>
      )}

      {showSaveAndBackButtonLoading && !mdDown && <Skeleton width={180} height={60} />}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={handleClickDeleteButton}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            noWrap
            textOverflow={'ellipsis'}
            overflow={'hidden'}
          >
            Apagar
          </Typography>
        </Button>
      )}

      {showDeleteButtonLoading && <Skeleton width={110} height={60} />}

      {showNewButton && !showNewButtonLoading && !smDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={handleClickNewButton}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            noWrap
            textOverflow={'ellipsis'}
            overflow={'hidden'}
          >
            {textNewButton}
          </Typography>
        </Button>
      )}

      {showNewButtonLoading && !smDown && <Skeleton width={110} height={60} />}

      {showBackButton &&
        (showSaveButton ||
          showSaveAndBackButton ||
          showDeleteButton ||
          showNewButton) && <Divider variant="middle" orientation="vertical" />}

      {showBackButton && !showBackButtonLoading && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={handleClickBackButton}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            noWrap
            textOverflow={'ellipsis'}
            overflow={'hidden'}
          >
            Voltar
          </Typography>
        </Button>
      )}

      {showBackButtonLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};
