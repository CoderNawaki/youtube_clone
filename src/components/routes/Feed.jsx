import { useCallback, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchSearchVideos } from '../../utils/fetchFromAPI';
import { useAsyncResource } from '../../hooks';
import { Sidebar, ErrorState, Videos, VideoGridSkeleton } from '../';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const loadVideos = useCallback(() => {
    return fetchSearchVideos(selectedCategory);
  }, [selectedCategory]);

  const {
    data: videos,
    isLoading,
    errorMessage,
    reload,
  } = useAsyncResource({
    loader: loadVideos,
    initialData: [],
    fallbackErrorMessage: 'Unable to load videos.',
  });

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box
        sx={{
          height: { sx: 'auto', md: '92vh' },
          borderRight: '1px solid',
          borderColor: 'divider',
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
          sx={{ mt: 1.5, color: 'text.primary' }}
        >
          Copyright 2025 youtube media
        </Typography>
      </Box>
      <Box
        component="main"
        p={2}
        sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}
      >
        <Typography
          component="h1"
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: 'text.primary' }}
        >
          {selectedCategory}{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            videos
          </Box>
        </Typography>
        {isLoading ? (
          <VideoGridSkeleton count={8} />
        ) : errorMessage ? (
          <ErrorState
            title="Unable to load videos"
            message={errorMessage}
            onRetry={reload}
          />
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
