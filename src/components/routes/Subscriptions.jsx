import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchChannelVideos } from '../../utils/fetchFromAPI';
import { getSubscriptions } from '../../utils/subscriptions';
import { Videos, EmptyState, ErrorState, VideoGridSkeleton } from '../';
import SubscriptionCard from '../shared/SubscriptionCard';

const Subscriptions = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadSubVideos = useCallback(async () => {
    const subs = getSubscriptions();
    if (subs.length === 0) {
      setVideos([]);
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const queries = subs.map((s) => fetchChannelVideos(s.id));
      const results = await Promise.all(queries);
      const all = results.flatMap((r) => r || []);
      const seen = new Set();
      const unique = all.filter((v) => {
        const id = v?.id?.videoId;
        if (!id || seen.has(id)) {
          return false;
        }
        seen.add(id);
        return true;
      });
      setVideos(unique);
    } catch {
      setErrorMessage('Failed to load subscription videos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSubVideos();
  }, [loadSubVideos]);

  const subs = useMemo(() => getSubscriptions(), []);

  if (subs.length === 0) {
    return (
      <Box
        component="main"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          px: 2,
        }}
      >
        <EmptyState
          title="No subscriptions yet"
          message="Subscribe to channels to see their latest videos here."
        />
      </Box>
    );
  }

  return (
    <Box
      component="main"
      p={2}
      sx={{ overflowY: 'auto', height: '90vh', pb: { xs: 7, md: 2 } }}
    >
      <Typography
        component="h1"
        variant="h5"
        fontWeight="bold"
        mb={2}
        sx={{ color: 'text.primary' }}
      >
        Subscriptions
      </Typography>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          overflow: 'auto',
          mb: 3,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {subs.map((sub) => (
          <Box
            key={sub.id}
            sx={{
              minWidth: 200,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              flexShrink: 0,
            }}
          >
            <SubscriptionCard sub={sub} />
          </Box>
        ))}
      </Stack>
      {isLoading ? (
        <VideoGridSkeleton count={4} />
      ) : errorMessage ? (
        <ErrorState
          title="Failed to load"
          message={errorMessage}
          onRetry={loadSubVideos}
        />
      ) : videos.length === 0 ? (
        <EmptyState
          title="No videos found"
          message="Try subscribing to more channels."
        />
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default Subscriptions;
