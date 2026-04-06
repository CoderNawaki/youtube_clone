import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

import { logo } from '../../utils/constants';
import SearchBar from './SearchBar';

const Navbar = () => (
  <Stack
    component="header"
    role="banner"
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: 'sticky',
      background: '#000',
      top: 0,
      justifyContent: 'space-between',
    }}
  >
    <Link
      to="/"
      aria-label="Go to homepage"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <img src={logo} alt="logo" height={45} />
    </Link>

    <SearchBar />
  </Stack>
);

export default Navbar;
