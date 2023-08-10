import { useState } from 'react';
import * as yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

import { useAuthContext } from '../../contexts';

interface ILoginProps {
  children: React.ReactNode;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

export const Login = ({ children }: ILoginProps) => {
  const { isAuthenticated, login } = useAuthContext();

  if (isAuthenticated) return <>{children}</>;

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('teste@teste.com');
  const [password, setPassword] = useState('testeteste');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((valitedData) => {
        login(valitedData.email, valitedData.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((err) => {
          if (err.path === 'email') {
            setEmailError(err.message);
          } else if (err.path === 'password') {
            setPasswordError(err.message);
          }
        });
      });
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={300}>
            <Typography variant="h6" align="center">
              Identifique-se
            </Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={() => setEmailError('')}
              label="Email"
              type="email"
              fullWidth
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={() => setPasswordError('')}
              label="Senha"
              type="password"
              fullWidth
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              endIcon={
                isLoading ? (
                  <CircularProgress size={20} variant="indeterminate" color="inherit" />
                ) : undefined
              }
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
