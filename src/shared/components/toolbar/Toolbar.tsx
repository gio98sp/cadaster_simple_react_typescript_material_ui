import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IToolbarProps {
  searchText?: string;
  showSearchInput?: boolean;
  changeSearchText?: (newText: string) => void;
  textNewButton?: string;
  showNewButton?: boolean;
  clickNewButton?: () => void;
}

export const Toolbar = ({
  searchText = '',
  showSearchInput = false,
  changeSearchText,
  clickNewButton,
  showNewButton = true,
  textNewButton = 'Novo',
}: IToolbarProps) => {
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
      {showSearchInput && (
        <TextField
          size="small"
          placeholder={Environment.INPUT_DE_BUSCA}
          value={searchText}
          onChange={e => changeSearchText?.(e.target.value)}
        />
      )}

      <Box display={'flex'} flex={1} justifyContent={'end'}>
        {showNewButton && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            endIcon={<Icon>add</Icon>}
            onClick={clickNewButton}
          >
            {textNewButton}
          </Button>
        )}
      </Box>
    </Box>
  );
};
