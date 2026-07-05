import { useCallback, useState } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CheckCircle, VolumeUp, VolumeOff } from '@mui/icons-material';
import { fetchSearchVideos } from '../../utils/fetchFromAPI';
import { useInfiniteScroll } from '../../hooks';
import { ErrorState, VideoGridSkeleton } from '../';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import {
  demoVideoUrl,
  demoVideoTitle,
  demoChannelTitle,
  demoChannelUrl,
} from '../../utils/constants';

const ShortsItem = ({ video }) => {
  const videoId = video?.id?.videoId;
  const snippet = video?.snippet;
  const title = snippet?.title || demoVideoTitle;
  const channelTitle = snippet?.channelTitle || demoChannelTitle;
  const channelId = snippet?.channelId;
  const [muted, setMuted] = useState(true);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        mb: 2,
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        position: 'relative',
      }}
    >
      <Link
        to={videoId ? `/video/${videoId}` : demoVideoUrl}
        aria-label={`Open video ${title}`}
      >
        <Box
          component="img"
          src={snippet?.thumbnails?.high?.url}
          alt={title}
          sx={{
            width: '100%',
            aspectRatio: 9 / 16,
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Link>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          setMuted(!muted);
        }}
        sx={{
          position: 'absolute',
          bottom: 100,
          right: 8,
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.5)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
        }}
        size="small"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
      <Box sx={{ p: 1.5 }}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="text.primary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Link
          to={channelId ? `/channel/${channelId}` : demoChannelUrl}
          aria-label={`Open channel ${channelTitle}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
            {channelTitle}
          </Typography>
          <CheckCircle
            aria-hidden="true"
            sx={{ fontSize: 12, color: 'custom.verifiedBadge' }}
          />
        </Link>
        {snippet?.publishedAt && (
          <Typography variant="caption" color="text.secondary" display="block">
            {formatRelativeTime(snippet.publishedAt)}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const Shorts = () => {
  const loadVideos = useCallback(
    (pageToken) => fetchSearchVideos('shorts', pageToken),
    []
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
    fallbackErrorMessage: 'Unable to load shorts.',
  });

  return (
    <Box
      component="main"
      sx={{
        overflowY: 'auto',
        height: '90vh',
        pb: { xs: 7, md: 2 },
        pt: 1,
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={2}
        sx={{ color: 'text.primary' }}
      >
        Shorts
      </Typography>
      {isLoading ? (
        <VideoGridSkeleton count={4} />
      ) : errorMessage ? (
        <ErrorState
          title="Unable to load shorts"
          message={errorMessage}
          onRetry={reload}
        />
      ) : (
        <>
          {videos.map((video) => (
            <ShortsItem key={video?.id?.videoId} video={video} />
          ))}
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

export default Shorts;
