import { useMemo } from 'react';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import {
  History,
  Subscriptions as SubscriptionsIcon,
  VideoLibrary,
  Person,
} from '@mui/icons-material';
import { getRecentlyWatched } from '../../utils/recentlyWatched';
import {
  getSubscriptions,
  getSubscriptionCount,
} from '../../utils/subscriptions';
import { Videos } from '../';
import SubscriptionCard from '../shared/SubscriptionCard';
import { Link } from 'react-router-dom';

const toVideoItem = (rw) => ({
  id: { videoId: rw.id },
  snippet: {
    title: rw.title,
    channelTitle: rw.channelTitle,
    channelId: rw.channelId,
    thumbnails: { high: { url: rw.thumbnail } },
  },
});

const You = () => {
  const recentlyWatched = useMemo(() => getRecentlyWatched(), []);
  const subs = useMemo(() => getSubscriptions(), []);
  const subCount = useMemo(() => getSubscriptionCount(), []);

  return (
    <Box
      component="main"
      p={2}
      sx={{ overflowY: 'auto', height: '90vh', pb: { xs: 7, md: 2 } }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Person sx={{ fontSize: 48, color: 'text.secondary' }} />
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: 'text.primary' }}
          >
            You
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subCount} subscription{subCount !== 1 ? 's' : ''}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
        <Chip
          icon={<History />}
          label="History"
          component={Link}
          to="#history"
          variant="outlined"
          clickable
          sx={{ borderRadius: 20 }}
        />
        <Chip
          icon={<VideoLibrary />}
          label="Your videos"
          component={Link}
          to="#videos"
          variant="outlined"
          clickable
          sx={{ borderRadius: 20 }}
        />
      </Box>

      {subs.length > 0 && (
        <Box mb={3}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <SubscriptionsIcon sx={{ color: 'text.secondary' }} />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: 'text.primary' }}
            >
              Subscriptions
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              overflow: 'auto',
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
        </Box>
      )}

      <Divider sx={{ mb: 2 }} />

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={1}
        sx={{ color: 'text.primary' }}
      >
        <History sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
        Recently watched
      </Typography>
      {recentlyWatched.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Videos you watch will appear here.
        </Typography>
      ) : (
        <Videos videos={recentlyWatched.map(toVideoItem)} />
      )}
    </Box>
  );
};

export default You;
