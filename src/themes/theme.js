import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F31503',
      light: '#ff4d4d',
      dark: '#cc0000',
    },
    divider: '#3d3d3d',
    background: {
      default: '#0f0f0f',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#f1f1f1',
      secondary: '#aaaaaa',
    },
    custom: {
      skeletonLight: '#2d2d2d',
      skeletonMid: '#242424',
      skeletonDark: '#1d1d1d',
      verifiedBadge: '#8a8a8a',
      focusOutline: '#ffb347',
      searchBorder: '#e3e3e3',
      channelCardBorder: '#e3e3e3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 700,
    },
    subtitle2: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2d2d2d',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            backgroundColor: '#cc0000',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: 0,
            height: 5,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(114, 113, 113)',
            borderRadius: 10,
            height: 200,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '& a': {
            textDecoration: 'none',
            color: 'inherit',
          },
          '& a:focus-visible, & button:focus-visible, & input:focus-visible': {
            outline: '3px solid #ffb347',
            outlineOffset: 2,
          },
        },
      },
    },
  },
});

export default theme;
