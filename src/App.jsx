import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AppErrorBoundary, Navbar, LoadingState } from './components/';
import { theme } from './themes/';

const Feed = lazy(() => import('./components/routes/Feed'));
const VideoDetail = lazy(() => import('./components/routes/VideoDetail'));
const ChannelDetail = lazy(() => import('./components/routes/ChannelDetail'));
const SearchFeed = lazy(() => import('./components/routes/SearchFeed'));

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'background.default' }}>
        <AppErrorBoundary>
          <Navbar />
          <Suspense fallback={<LoadingState message="Loading page..." />}>
            <Routes>
              <Route path="/" exact element={<Feed />} />
              <Route path="/video/:id" element={<VideoDetail />} />
              <Route path="/channel/:id" element={<ChannelDetail />} />
              <Route path="/search/:searchTerm" element={<SearchFeed />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </Box>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
