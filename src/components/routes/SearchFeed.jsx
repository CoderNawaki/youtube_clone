import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { fetchSearchVideos } from '../../utils/fetchFromAPI';
import { useAsyncResource } from '../../hooks';
import { Videos, ErrorState, VideoGridSkeleton } from '../';

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const loadVideos = useCallback(() => {
    return fetchSearchVideos(searchTerm);
  }, [searchTerm]);

  const {
    data: videos,
    isLoading,
    errorMessage,
    reload,
  } = useAsyncResource({
    loader: loadVideos,
    initialData: [],
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
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default SearchFeed;
