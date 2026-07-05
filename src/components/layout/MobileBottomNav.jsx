import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Home,
  OndemandVideo,
  Person,
  Subscriptions,
} from '@mui/icons-material';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [uploadSnack, setUploadSnack] = useState(false);

  const getValue = () => {
    const path = location.pathname;
    if (path === '/shorts') {
      return 1;
    }
    if (path === '/subscriptions') {
      return 3;
    }
    if (path === '/you' || path.startsWith('/channel')) {
      return 4;
    }
    return 0;
  };

  return (
    <>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200 }}
        elevation={3}
      >
        <BottomNavigation
          value={getValue()}
          showLabels
          sx={{ bgcolor: 'background.paper' }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            onClick={() => navigate('/')}
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
          <BottomNavigationAction
            label="Shorts"
            icon={<OndemandVideo />}
            onClick={() => navigate('/shorts')}
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
          <BottomNavigationAction
            label=""
            onClick={() => setUploadSnack(true)}
            icon={
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: -1,
                }}
              >
                <Add sx={{ color: '#fff' }} />
              </Box>
            }
          />
          <BottomNavigationAction
            label="Subscriptions"
            icon={<Subscriptions />}
            onClick={() => navigate('/subscriptions')}
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
          <BottomNavigationAction
            label="You"
            icon={<Person />}
            onClick={() => navigate('/you')}
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
        </BottomNavigation>
      </Paper>
      <Snackbar
        open={uploadSnack}
        onClose={() => setUploadSnack(false)}
        message="Upload not available in demo"
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default MobileBottomNav;
