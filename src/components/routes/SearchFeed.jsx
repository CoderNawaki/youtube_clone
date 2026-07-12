import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { fetchSearchVideos } from '../../utils/fetchFromAPI';
import { useInfiniteScroll } from '../../hooks';
import { Videos, ErrorState, VideoGridSkeleton } from '../';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Videos', value: 'video' },
  { label: 'Channels', value: 'channel' },
];

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [filter, setFilter] = useState('all');
  const loadVideos = useCallback(
    (pageToken) => {
      return fetchSearchVideos(searchTerm, pageToken, filter);
    },
    [searchTerm, filter]
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
        </Box>
      </Typography>

      <Stack direction="row" spacing={1} mb={2}>
        {FILTERS.map((f) => (
          <Chip
            key={f.value}
            label={f.label}
            onClick={() => setFilter(f.value)}
            variant={filter === f.value ? 'filled' : 'outlined'}
            color={filter === f.value ? 'primary' : 'default'}
            sx={{ borderRadius: 20, cursor: 'pointer' }}
          />
        ))}
      </Stack>

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
