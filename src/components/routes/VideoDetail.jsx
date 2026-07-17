import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ReactPlayer from 'react-player';

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import {
  CheckCircle,
  ThumbUpOutlined,
  ThumbUp,
  ThumbDownOffAltOutlined,
  ThumbDownAlt,
  Reply,
} from '@mui/icons-material';
import { Videos, LoadingState, ErrorState } from '../';

import { useAsyncResource, usePersistedState } from '../../hooks';
import {
  fetchChannelDetails,
  fetchRelatedVideos,
  fetchVideoComments,
  fetchVideoDetails,
} from '../../utils/fetchFromAPI';
import { addRecentlyWatched } from '../../utils/recentlyWatched';
import {
  getVideoLikeStatus,
  setVideoLike,
} from '../../utils/videoInteractions';

const abbreviateNumber = (num) => {
  if (!num) {
    return null;
  }
  const n = parseInt(num, 10);
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return n.toLocaleString();
};

const formatPublishedDate = (dateStr) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const CommentCard = ({ comment }) => {
  const snippet =
    comment?.snippet?.topLevelComment?.snippet || comment?.snippet || {};
  const author = snippet?.authorDisplayName || 'Unknown';
  const text = snippet?.textDisplay || '';
  const publishedAt = snippet?.publishedAt;
  const avatar = snippet?.authorProfileImageUrl;

  return (
    <Stack direction="row" spacing={1.5}>
      <Avatar src={avatar} alt={author} sx={{ width: 36, height: 36 }}>
        {author.charAt(0)}
      </Avatar>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="text.primary"
          >
            {author}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatPublishedDate(publishedAt)}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ mt: 0.25, whiteSpace: 'pre-wrap' }}
        >
          {text}
        </Typography>
      </Box>
    </Stack>
  );
};

const VideoDetail = () => {
  const { id } = useParams();
  const [descExpanded, setDescExpanded] = useState(false);
  const likeStatus = getVideoLikeStatus(id);
  const [liked, setLiked] = useState(likeStatus);

  const loadVideo = useCallback(async () => {
    const [videoDetail, videos, channelDetail, comments] = await Promise.all([
      fetchVideoDetails(id),
      fetchRelatedVideos(id),
      fetchChannelDetails(id).catch(() => null),
      fetchVideoComments(id),
    ]);

    return {
      videoDetail,
      videos,
      channelDetail,
      comments,
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
      channelDetail: null,
      comments: [],
    },
    fallbackErrorMessage: 'Unable to load video.',
  });

  const { videoDetail, videos, channelDetail, comments } = videoData;

  const {
    snippet: { title, channelId, channelTitle, description },
    statistics: { viewCount, likeCount },
  } = videoDetail ?? { snippet: {}, statistics: {} };

  const subscriberCount = channelDetail?.statistics?.subscriberCount;
  const navigate = useNavigate();
  const [autoplay, setAutoplay] = usePersistedState('yt_autoplay', true);
  const nextVideo = videos.find((v) => v.id?.videoId);

  const handleVideoEnded = () => {
    if (autoplay && nextVideo) {
      navigate(`/video/${nextVideo.id.videoId}`);
    }
  };

  useEffect(() => {
    if (!videoDetail?.snippet) {
      return;
    }
    addRecentlyWatched({
      id,
      title,
      channelTitle,
      channelId,
      thumbnail: videoDetail.snippet.thumbnails?.high?.url || '',
    });
  }, [id, title, channelTitle, channelId, videoDetail]);

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

  const handleLike = () => {
    const next = liked === 'like' ? null : 'like';
    setLiked(next);
    setVideoLike(id, next);
  };

  const handleDislike = () => {
    const next = liked === 'dislike' ? null : 'dislike';
    setLiked(next);
    setVideoLike(id, next);
  };

  return (
    <Box component="main" minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1} sx={{ px: { xs: 0, md: 2 }, pt: { xs: 0, md: 2 } }}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch/?v=${id}`}
              className="react-player"
              controls
              onEnded={handleVideoEnded}
            />

            <Typography
              color="text.primary"
              variant="h6"
              fontWeight="bold"
              sx={{ mt: 1.5, mb: 1, px: { xs: 2, md: 0 } }}
            >
              {title}
            </Typography>

            <Box sx={{ px: { xs: 2, md: 0 } }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={1}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    component={Link}
                    to={`/channel/${channelId}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      textDecoration: 'none',
                    }}
                  >
                    <Avatar
                      src={channelDetail?.snippet?.thumbnails?.high?.url}
                      alt={channelTitle}
                      sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}
                    >
                      {channelTitle?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        {channelTitle}
                        <CheckCircle
                          aria-hidden="true"
                          sx={{
                            fontSize: 14,
                            color: 'custom.verifiedBadge',
                            ml: 0.3,
                            verticalAlign: 'middle',
                          }}
                        />
                      </Typography>
                      {subscriberCount && (
                        <Typography variant="caption" color="text.secondary">
                          {abbreviateNumber(subscriberCount)} subscribers
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/channel/${channelId}`}
                    sx={{ textTransform: 'none', borderRadius: 20, px: 2 }}
                  >
                    Subscribe
                  </Button>
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Chip
                    icon={
                      liked === 'like' ? (
                        <ThumbUp sx={{ fontSize: 18 }} />
                      ) : (
                        <ThumbUpOutlined sx={{ fontSize: 18 }} />
                      )
                    }
                    label={abbreviateNumber(likeCount) || 0}
                    onClick={handleLike}
                    variant="outlined"
                    sx={{
                      borderRadius: '20px 0 0 20px',
                      borderRight: 'none',
                      cursor: 'pointer',
                      color:
                        liked === 'like' ? 'primary.main' : 'text.secondary',
                    }}
                  />
                  <Divider orientation="vertical" flexItem />
                  <Chip
                    icon={
                      liked === 'dislike' ? (
                        <ThumbDownAlt sx={{ fontSize: 18 }} />
                      ) : (
                        <ThumbDownOffAltOutlined sx={{ fontSize: 18 }} />
                      )
                    }
                    onClick={handleDislike}
                    variant="outlined"
                    sx={{
                      borderRadius: '0 20px 20px 0',
                      borderLeft: 'none',
                      cursor: 'pointer',
                      color:
                        liked === 'dislike' ? 'primary.main' : 'text.secondary',
                    }}
                  />
                  <Chip
                    icon={<Reply sx={{ fontSize: 18 }} />}
                    label="Share"
                    variant="outlined"
                    sx={{ borderRadius: 20, cursor: 'pointer' }}
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                    }}
                  />
                </Stack>
              </Stack>
            </Box>

            <Box
              sx={{
                mx: { xs: 2, md: 0 },
                mt: 2,
                p: 2,
                bgcolor: 'action.hover',
                borderRadius: 2,
                cursor: 'pointer',
              }}
              onClick={() => setDescExpanded(!descExpanded)}
            >
              <Stack direction="row" spacing={2} mb={1}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {formatPublishedDate(videoDetail.snippet.publishedAt)}
                </Typography>
              </Stack>
              {description && (
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    ...(descExpanded
                      ? {}
                      : {
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }),
                  }}
                >
                  {description}
                </Typography>
              )}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: 'block' }}
              >
                {descExpanded ? 'Show less' : 'Show more'}
              </Typography>
            </Box>

            {comments.length > 0 && (
              <Box sx={{ mx: { xs: 2, md: 0 }, mt: 3, mb: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.primary"
                  mb={2}
                >
                  Comments ({comments.length})
                </Typography>
                <Stack spacing={2}>
                  {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Switch
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
                size="small"
              />
            }
            label="Autoplay next video"
            sx={{
              mb: 1,
              color: 'text.secondary',
              '& .MuiTypography-root': { fontSize: 13 },
            }}
          />
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};
export default VideoDetail;
