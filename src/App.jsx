import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimatePresence } from 'framer-motion';
import {
  AppErrorBoundary,
  Navbar,
  LoadingState,
  AnimatedPage,
} from './components/';
import { LoadingBarProvider } from './components/layout/TopLoadingBar';
import { theme } from './themes/';

const Feed = lazy(() => import('./components/routes/Feed'));
const VideoDetail = lazy(() => import('./components/routes/VideoDetail'));
const ChannelDetail = lazy(() => import('./components/routes/ChannelDetail'));
const SearchFeed = lazy(() => import('./components/routes/SearchFeed'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          exact
          element={
            <AnimatedPage>
              <Feed />
            </AnimatedPage>
          }
        />
        <Route
          path="/video/:id"
          element={
            <AnimatedPage>
              <VideoDetail />
            </AnimatedPage>
          }
        />
        <Route
          path="/channel/:id"
          element={
            <AnimatedPage>
              <ChannelDetail />
            </AnimatedPage>
          }
        />
        <Route
          path="/search/:searchTerm"
          element={
            <AnimatedPage>
              <SearchFeed />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'background.default' }}>
        <AppErrorBoundary>
          <Navbar />
          <LoadingBarProvider>
            <Suspense fallback={<LoadingState message="Loading page..." />}>
              <AnimatedRoutes />
            </Suspense>
          </LoadingBarProvider>
        </AppErrorBoundary>
      </Box>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
