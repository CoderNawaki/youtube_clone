import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Videos, ChannelCard, LoadingState, ErrorState } from './';
import { fetchChannelDetails, fetchChannelVideos } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const loadChannel = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const [nextChannelDetail, nextVideos] = await Promise.all([
          fetchChannelDetails(id),
          fetchChannelVideos(id),
        ]);

        if (isMounted) {
          setChannelDetail(nextChannelDetail);
          setVideos(nextVideos);
        }
      } catch (error) {
        if (isMounted) {
          setChannelDetail(null);
          setVideos([]);
          setErrorMessage(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadChannel();

    return () => {
      isMounted = false;
    };
  }, [id, retryCount]);

  if (isLoading) {
    return <LoadingState message="Loading channel details..." />;
  }

  if (errorMessage) {
    return (
      <ErrorState
        title="Unable to load channel"
        message={errorMessage}
        onRetry={() => setRetryCount((current) => current + 1)}
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
