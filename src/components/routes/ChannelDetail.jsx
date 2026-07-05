import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Videos, ChannelCard, LoadingState, ErrorState } from '../';
import { useAsyncResource } from '../../hooks';
import {
  fetchChannelDetails,
  fetchChannelVideos,
} from '../../utils/fetchFromAPI';
import { isSubscribed, toggleSubscription } from '../../utils/subscriptions';

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

  return (
    <Box component="main" minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              'linear-Gradient(90deg,rgba(0,238,247,1)0%,rgba(206,3,184,1)100%,rgba(0,212,255,1)100%)',
            zIndex: 10,
            height: '300px',
          }}
        ></div>
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" justifyContent="center" mt={-2} mb={2}>
        <Button
          variant={subscribed ? 'outlined' : 'contained'}
          color="primary"
          size="medium"
          onClick={handleSubscribe}
          sx={{ textTransform: 'none', borderRadius: 20, px: 3 }}
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </Button>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
