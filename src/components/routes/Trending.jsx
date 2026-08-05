import { useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Whatshot } from '@mui/icons-material';
import { fetchTrendingVideos } from '../../utils/fetchFromAPI';
import { useInfiniteScroll } from '../../hooks';
import { ErrorState, Videos, VideoGridSkeleton } from '../';

const Trending = () => {
  const loadVideos = useCallback(
    (pageToken) => fetchTrendingVideos(pageToken),
    []
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
    fallbackErrorMessage: 'Unable to load trending videos.',
  });

  return (
    <Box
      component="main"
      p={2}
      sx={{ overflowY: 'auto', height: '90vh', pb: { xs: 7, md: 2 } }}
    >
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{ color: 'text.primary' }}
      >
        <Whatshot
          sx={{
            fontSize: 34,
            verticalAlign: 'middle',
            mr: 1,
            color: 'primary.main',
          }}
        />
        Trending
      </Typography>
      {isLoading ? (
        <VideoGridSkeleton count={8} />
      ) : errorMessage ? (
        <ErrorState
          title="Unable to load trending videos"
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
  );
};

export default Trending;
