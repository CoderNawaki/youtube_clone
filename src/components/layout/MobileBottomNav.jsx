import { useCallback, useState } from 'react';
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

  const handleChange = useCallback(
    (_, newValue) => {
      if (newValue === 0) {
        navigate('/');
      } else if (newValue === 1) {
        navigate('/shorts');
      } else if (newValue === 2) {
        setUploadSnack(true);
      } else if (newValue === 3) {
        navigate('/subscriptions');
      } else if (newValue === 4) {
        navigate('/you');
      }
    },
    [navigate]
  );

  return (
    <>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200 }}
        elevation={3}
      >
        <BottomNavigation
          value={getValue()}
          onChange={handleChange}
          showLabels
          sx={{ bgcolor: 'background.paper' }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
          <BottomNavigationAction
            label="Shorts"
            icon={<OndemandVideo />}
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
          <BottomNavigationAction
            label=""
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
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
          <BottomNavigationAction
            label="You"
            icon={<Person />}
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
