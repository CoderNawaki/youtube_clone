import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import ReactPlayer from 'react-player';

import { Typography, Box, Stack } from '@mui/material';

import { CheckCircle } from '@mui/icons-material';
import { Videos, LoadingState, ErrorState } from '../';

import { useAsyncResource } from '../../hooks';
import {
  fetchRelatedVideos,
  fetchVideoDetails,
} from '../../utils/fetchFromAPI';

const VideoDetail = () => {
  const { id } = useParams();
  const loadVideo = useCallback(async () => {
    const [videoDetail, videos] = await Promise.all([
      fetchVideoDetails(id),
      fetchRelatedVideos(id),
    ]);

    return {
      videoDetail,
      videos,
    };
  }, [id]);

  const {
    data: videoData,
    isLoading,
    errorMessage,
    reload,
  } = useAsyncResource({
    loader: loadVideo,
    initialData: {
      videoDetail: null,
      videos: [],
    },
    fallbackErrorMessage: 'Unable to load video.',
  });

  const { videoDetail, videos } = videoData;

  if (isLoading) {
    return <LoadingState message="Loading video details..." />;
  }

  if (errorMessage || !videoDetail?.snippet) {
    return (
      <ErrorState
        title="Unable to load video"
        message={errorMessage || 'The requested video could not be found.'}
        onRetry={reload}
      />
    );
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch/?v=${id}`}
              className="react-player"
              controls
            />

            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: '#fff' }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant="subtitle1"
                  sx={{ sm: 'subtitle1', md: 'h6', color: '#fff' }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
                  />
                </Typography>
              </Link>

              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};
export default VideoDetail;
