import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Videos, ChannelCard, LoadingState, ErrorState } from '../';
import { useAsyncResource } from '../../hooks';
import {
  fetchChannelDetails,
  fetchChannelVideos,
} from '../../utils/fetchFromAPI';

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

  return (
    <Box minHeight="95vh">
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
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
