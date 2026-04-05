import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchSearchVideos } from '../utils/fetchFromAPI';
import { Videos, Sidebar, LoadingState, ErrorState } from './';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const nextVideos = await fetchSearchVideos(selectedCategory);

        if (isMounted) {
          setVideos(nextVideos);
        }
      } catch (error) {
        if (isMounted) {
          setVideos([]);
          setErrorMessage(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, retryCount]);

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box
        sx={{
          height: { sx: 'auto', md: '92vh' },
          borderRight: '1px solid #3d3d3d',
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: '#fff' }}
        >
          Copyright 2025 youtube media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: 'white' }}
        >
          {selectedCategory} <span style={{ color: '#F31503' }}>videos</span>
        </Typography>
        {isLoading ? (
          <LoadingState message={`Loading ${selectedCategory} videos...`} />
        ) : errorMessage ? (
          <ErrorState
            title="Unable to load videos"
            message={errorMessage}
            onRetry={() => setRetryCount((current) => current + 1)}
          />
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
