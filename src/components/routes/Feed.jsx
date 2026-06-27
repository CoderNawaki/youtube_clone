import { useCallback } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { fetchSearchVideos } from '../../utils/fetchFromAPI';
import { useInfiniteScroll, usePersistedState } from '../../hooks';
import { Sidebar, ErrorState, Videos, VideoGridSkeleton } from '../';
import { getRecentlyWatched } from '../../utils/recentlyWatched';

const toVideoItem = (rw) => ({
  id: { videoId: rw.id },
  snippet: {
    title: rw.title,
    channelTitle: rw.channelTitle,
    channelId: rw.channelId,
    thumbnails: { high: { url: rw.thumbnail } },
  },
});

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = usePersistedState(
    'yt_selected_category',
    'New'
  );
  const loadVideos = useCallback(
    (pageToken) => {
      return fetchSearchVideos(selectedCategory, pageToken);
    },
    [selectedCategory]
  );

  const {
    items: videos,
    isLoading,
    isLoadingMore,
    errorMessage,
    hasMore,
    sentinelRef,
    reload,
  } = useInfiniteScroll({
    loader: loadVideos,
    fallbackErrorMessage: 'Unable to load videos.',
  });

  const recentlyWatched = getRecentlyWatched();

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
        {recentlyWatched.length > 0 && (
          <Box mb={3}>
            <Typography
              component="h2"
              variant="h6"
              fontWeight="bold"
              mb={1}
              sx={{ color: 'text.primary' }}
            >
              Recently watched
            </Typography>
            <Videos videos={recentlyWatched.map(toVideoItem)} />
          </Box>
        )}
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
          <>
            <Videos videos={videos} />
            {isLoadingMore && (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress size={28} sx={{ color: 'primary.main' }} />
              </Box>
            )}
            {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
