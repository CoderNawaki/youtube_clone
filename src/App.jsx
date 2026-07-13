import { Suspense, lazy, useMemo } from 'react';
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
import MobileBottomNav from './components/layout/MobileBottomNav';
import { LoadingBarProvider } from './components/layout/TopLoadingBar';
import { SidebarProvider } from './context/SidebarContext';
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext';
import { createAppTheme } from './themes/';

const Feed = lazy(() => import('./components/routes/Feed'));
const VideoDetail = lazy(() => import('./components/routes/VideoDetail'));
const ChannelDetail = lazy(() => import('./components/routes/ChannelDetail'));
const SearchFeed = lazy(() => import('./components/routes/SearchFeed'));
const Shorts = lazy(() => import('./components/routes/Shorts'));
const Subscriptions = lazy(() => import('./components/routes/Subscriptions'));
const You = lazy(() => import('./components/routes/You'));

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
        <Route
          path="/shorts"
          element={
            <AnimatedPage>
              <Shorts />
            </AnimatedPage>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <AnimatedPage>
              <Subscriptions />
            </AnimatedPage>
          }
        />
        <Route
          path="/you"
          element={
            <AnimatedPage>
              <You />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const ThemedApp = () => {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'background.default' }}>
        <AppErrorBoundary>
          <SidebarProvider>
            <Navbar />
            <LoadingBarProvider>
              <Suspense fallback={<LoadingState message="Loading page..." />}>
                <AnimatedRoutes />
              </Suspense>
            </LoadingBarProvider>
            <MobileBottomNav />
          </SidebarProvider>
        </AppErrorBoundary>
      </Box>
    </ThemeProvider>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  </BrowserRouter>
);

export default App;
