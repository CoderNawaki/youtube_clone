import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { fetchSearchVideos } from '../../utils/fetchFromAPI';
import { useInfiniteScroll } from '../../hooks';
import { Videos, ErrorState, VideoGridSkeleton } from '../';

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const loadVideos = useCallback(
    (pageToken) => {
      return fetchSearchVideos(searchTerm, pageToken);
    },
    [searchTerm]
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
    fallbackErrorMessage: 'Search failed.',
  });

  return (
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
        Search Results for:
        <Box component="span" sx={{ color: 'primary.main' }}>
          {searchTerm}
        </Box>{' '}
        Videos
      </Typography>

      {isLoading ? (
        <VideoGridSkeleton count={8} />
      ) : errorMessage ? (
        <ErrorState
          title="Search failed"
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

export default SearchFeed;
