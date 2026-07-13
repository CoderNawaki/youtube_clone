import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Snackbar,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  DarkMode,
  LightMode,
  NotificationsNone,
  Search,
} from '@mui/icons-material';

import { logo } from '../../utils/constants';
import SearchBar from './SearchBar';
import { useThemeMode } from '../../context/ThemeModeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showSearch, setShowSearch] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { mode, toggle: toggleTheme } = useThemeMode();

  const handleSearchClick = useCallback(() => {
    if (isMobile) {
      setShowSearch(true);
    } else {
      navigate('/search/new');
    }
  }, [isMobile, navigate]);

  if (isMobile && showSearch) {
    return (
      <Stack
        component="header"
        role="banner"
        direction="row"
        alignItems="center"
        p={1}
        sx={{
          position: 'sticky',
          bgcolor: 'background.default',
          top: 0,
          gap: 1,
        }}
      >
        <IconButton
          aria-label="Close search"
          onClick={() => setShowSearch(false)}
          sx={{ color: 'text.primary' }}
        >
          <ArrowBack />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <SearchBar />
        </Box>
      </Stack>
    );
  }

  return (
    <>
      <Stack
        component="header"
        role="banner"
        direction="row"
        alignItems="center"
        px={2}
        py={1}
        sx={{
          position: 'sticky',
          bgcolor: 'background.default',
          top: 0,
          justifyContent: 'space-between',
          minHeight: 56,
        }}
      >
        <Link
          to="/"
          aria-label="Go to homepage"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img src={logo} alt="logo" height={isMobile ? 28 : 45} />
        </Link>

        <Stack direction="row" alignItems="center" gap={0.5}>
          <IconButton
            aria-label={
              mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            onClick={toggleTheme}
            sx={{ color: 'text.primary' }}
          >
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton
            aria-label="Notifications"
            onClick={() => setNotifOpen(true)}
            sx={{ color: 'text.primary' }}
          >
            <NotificationsNone />
          </IconButton>
          {isMobile && (
            <IconButton
              aria-label="Search"
              onClick={handleSearchClick}
              sx={{ color: 'text.primary' }}
            >
              <Search />
            </IconButton>
          )}
          {!isMobile && <SearchBar />}
        </Stack>
      </Stack>
      <Snackbar
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        message="No notifications"
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default Navbar;
