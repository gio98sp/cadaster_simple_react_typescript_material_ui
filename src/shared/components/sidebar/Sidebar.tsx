import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';

interface ISidebarProps {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, label, icon, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const Sidebar = ({ children }: ISidebarProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}>
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column">
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://avatars.githubusercontent.com/u/100538460?v=4"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  label={drawerOption.label}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  key={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
