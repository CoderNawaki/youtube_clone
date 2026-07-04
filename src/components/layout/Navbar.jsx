import { Link } from 'react-router-dom';
import { Box, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { logo } from '../../utils/constants';
import SearchBar from './SearchBar';
import { useSidebar } from '../../context/SidebarContext';

const Navbar = () => {
  const { setMobileOpen } = useSidebar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      component="header"
      role="banner"
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: 'sticky',
        bgcolor: 'background.default',
        top: 0,
        justifyContent: 'space-between',
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        {isMobile && (
          <IconButton
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            sx={{ color: 'text.primary' }}
          >
            <Menu />
          </IconButton>
        )}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Link
            to="/"
            aria-label="Go to homepage"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img src={logo} alt="logo" height={45} />
          </Link>
        </Box>
      </Stack>

      <SearchBar />
    </Stack>
  );
};

export default Navbar;
