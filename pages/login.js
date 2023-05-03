import { useState } from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router';

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Image from 'next/image';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const { data: session } = useSession()

  
  const handleLogout = () => {
    signOut();
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    const result = await signIn('credentials', { username, password, redirect: false });
    if (!result.error) {
      router.push('dashboards/crypto');
    } else {
      setError(result.error);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/diamond.png")',
        backgroundRepeat: 'repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 2,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Image src="/logo_mmaya.png" alt="Logo"
            width={320}
            height={120}
            objectFit="contain"
            sx={{ mb: 3 }}/>
          <Typography variant="h4" sx={{ mb: 3 }}>
          Inicia sesión en SIARH
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Usuario"
              value={username}
              onChange={handleUsernameChange}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              margin="normal"
              variant="outlined"
              required
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type="submit" variant="contained" sx={{ bgcolor: 'primary.main', color: 'common.white', '&:hover': { bgcolor: 'primary.dark' } }}>
              Entrar
            </Button>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {error}
          </Typography>
          </Box>
        </Box>
      </Container>
      </Box>

  );
}
