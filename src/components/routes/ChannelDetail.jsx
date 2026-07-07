import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Videos, LoadingState, ErrorState } from '../';
import { useAsyncResource } from '../../hooks';
import {
  fetchChannelDetails,
  fetchChannelVideos,
} from '../../utils/fetchFromAPI';
import { isSubscribed, toggleSubscription } from '../../utils/subscriptions';
import { demoProfilePicture } from '../../utils/constants';

const abbreviateNumber = (num) => {
  if (!num) {return null;}
  const n = parseInt(num, 10);
  if (n >= 1000000) {return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';}
  if (n >= 1000) {return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';}
  return n.toLocaleString();
};

const ChannelDetail = () => {
  const { id } = useParams();
  const loadChannel = useCallback(async () => {
    const [channelDetail, videos] = await Promise.all([
      fetchChannelDetails(id),
      fetchChannelVideos(id),
    ]);

    return {
      channelDetail,
      videos,
    };
  }, [id]);

  const {
    data: channelData,
    isLoading,
    errorMessage,
    reload,
  } = useAsyncResource({
    loader: loadChannel,
    initialData: {
      channelDetail: null,
      videos: [],
    },
    fallbackErrorMessage: 'Unable to load channel.',
  });

  const { channelDetail, videos } = channelData;
  const channelId = channelDetail?.id?.channelId || channelDetail?.id;
  const [, setSubTick] = useState(0);
  const subscribed = isSubscribed(channelId);
  const bannerUrl = channelDetail?.brandingSettings?.image?.bannerExternalUrl;

  const handleSubscribe = () => {
    toggleSubscription({
      id: channelId,
      title: channelDetail?.snippet?.title,
      thumbnail: channelDetail?.snippet?.thumbnails?.high?.url,
    });
    setSubTick((t) => t + 1);
  };

  if (isLoading) {
    return <LoadingState message="Loading channel details..." />;
  }

  if (errorMessage) {
    return (
      <ErrorState
        title="Unable to load channel"
        message={errorMessage}
        onRetry={reload}
      />
    );
  }

  if (!channelDetail) {
    return (
      <ErrorState
        title="Channel not found"
        message="The requested channel could not be found."
        onRetry={reload}
      />
    );
  }

  const snippet = channelDetail.snippet;
  const stats = channelDetail.statistics;

  return (
    <Box component="main" minHeight="95vh">
      <Box
        sx={{
          height: { xs: 150, sm: 200, md: 250 },
          background: bannerUrl
            ? `url(${bannerUrl}) center/cover no-repeat`
            : 'linear-gradient(135deg, #0ea5e9 0%, #7c3aed 50%, #ec4899 100%)',
        }}
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        sx={{ px: { xs: 2, md: 4 }, mt: { xs: -4, sm: -6 }, mb: 3 }}
      >
        <Avatar
          src={snippet?.thumbnails?.high?.url || demoProfilePicture}
          alt={snippet?.title}
          sx={{
            width: { xs: 72, sm: 96, md: 120 },
            height: { xs: 72, sm: 96, md: 120 },
            border: '3px solid',
            borderColor: 'background.default',
            bgcolor: 'primary.main',
          }}
        />
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            {snippet?.title}
            <CheckCircle
              aria-hidden="true"
              sx={{
                fontSize: 18,
                color: 'custom.verifiedBadge',
                ml: 0.5,
                verticalAlign: 'middle',
              }}
            />
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            sx={{ mt: 0.5, mb: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              {snippet?.customUrl || `@${snippet?.title?.replace(/\s+/g, '')}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {abbreviateNumber(stats?.subscriberCount)} subscribers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {abbreviateNumber(stats?.videoCount)} videos
            </Typography>
          </Stack>
          {snippet?.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {snippet.description}
            </Typography>
          )}
          <Stack
            direction="row"
            spacing={1}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
          >
            <Button
              variant={subscribed ? 'outlined' : 'contained'}
              color="primary"
              size="medium"
              onClick={handleSubscribe}
              sx={{ textTransform: 'none', borderRadius: 20, px: 3 }}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
            <Chip label="Videos" color="primary" size="small" />
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 7, md: 2 } }}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
