import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode } from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  children?: ReactNode;
  title: string;
  toolbar?: ReactNode;
}

export const LayoutBaseDePagina = ({
  children,
  title,
  toolbar,
}: ILayoutBaseDePaginaProps) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display={'flex'} flexDirection={'column'} gap={1}>
      <Box
        padding={1}
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        display={'flex'}
        alignItems={'center'}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          whiteSpace={'nowrap'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
        >
          {title}
        </Typography>
      </Box>
      {toolbar && <Box>{toolbar}</Box>}
      <Box flex={1} overflow={'auto'}>
        {children}
      </Box>
    </Box>
  );
};
