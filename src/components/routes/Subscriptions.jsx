import { useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchSearchVideos } from '../../utils/fetchFromAPI';
import { getSubscriptions } from '../../utils/subscriptions';
import { Videos, EmptyState, ErrorState, VideoGridSkeleton } from '../';

const Subscriptions = () => {
  const subs = getSubscriptions();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadSubVideos = useCallback(async () => {
    if (subs.length === 0) {
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const queries = subs.map((s) => fetchSearchVideos(s.title, null));
      const results = await Promise.all(queries);
      const all = results.flatMap((r) => r?.items || []);
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
  }, [subs]);

  useEffect(() => {
    loadSubVideos();
  }, [loadSubVideos]);

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
      <Box display="flex" gap={1.5} flexWrap="wrap" mb={3}>
        {subs.map((sub) => (
          <Button
            key={sub.id}
            component={Link}
            to={`/channel/${sub.id}`}
            variant="outlined"
            size="small"
            startIcon={
              <Avatar
                src={sub.thumbnail}
                alt={sub.title}
                sx={{ width: 24, height: 24 }}
              >
                {sub.title?.charAt(0)}
              </Avatar>
            }
            sx={{ textTransform: 'none', borderRadius: 20 }}
          >
            {sub.title}
          </Button>
        ))}
      </Box>
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
