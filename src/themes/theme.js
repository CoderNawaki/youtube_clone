import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#F31503',
        light: '#ff4d4d',
        dark: '#cc0000',
      },
      divider: mode === 'dark' ? '#3d3d3d' : '#e0e0e0',
      background:
        mode === 'dark'
          ? { default: '#0f0f0f', paper: '#1e1e1e' }
          : { default: '#f9f9f9', paper: '#ffffff' },
      text:
        mode === 'dark'
          ? { primary: '#f1f1f1', secondary: '#aaaaaa' }
          : { primary: '#0f0f0f', secondary: '#606060' },
      custom:
        mode === 'dark'
          ? {
              skeletonLight: '#2d2d2d',
              skeletonMid: '#242424',
              skeletonDark: '#1d1d1d',
              verifiedBadge: '#8a8a8a',
              focusOutline: '#ffb347',
              searchBorder: '#e3e3e3',
              channelCardBorder: '#e3e3e3',
            }
          : {
              skeletonLight: '#e0e0e0',
              skeletonMid: '#d0d0d0',
              skeletonDark: '#c0c0c0',
              verifiedBadge: '#606060',
              focusOutline: '#ffb347',
              searchBorder: '#ccc',
              channelCardBorder: '#ccc',
            },
    },
    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 700 },
      subtitle2: { fontWeight: 700 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: { boxShadow: 'none', borderRadius: 0 },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#2d2d2d' : '#e0e0e0',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            '&:hover': { backgroundColor: '#cc0000' },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { width: 0, height: 5 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgb(114, 113, 113)',
              borderRadius: 10,
              height: 200,
            },
            '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
            '& a': { textDecoration: 'none', color: 'inherit' },
            '& a:focus-visible, & button:focus-visible, & input:focus-visible':
              { outline: '3px solid #ffb347', outlineOffset: 2 },
          },
        },
      },
    },
  });
