import { Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { formatRelativeTime } from '../../utils/formatRelativeTime';
import {
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from '../../utils/constants';

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  const title = snippet?.title || demoVideoTitle;
  const channelTitle = snippet?.channelTitle || demoChannelTitle;
  const channelId = snippet?.channelId;

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '358px', md: '320px' },
        boxShadow: 'none',
        borderRadius: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        },
      }}
    >
      <Link
        to={videoId ? `/video/${videoId}` : demoVideoUrl}
        aria-label={`Open video ${title}`}
      >
        <CardMedia
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{
            width: { xs: '100%', sm: '358px' },
            height: 180,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      </Link>
      <CardContent
        sx={{
          bgcolor: 'background.paper',
          height: 'auto',
          minHeight: 100,
          p: 1.5,
          display: 'flex',
          gap: 1.5,
        }}
      >
        <Link
          to={channelId ? `/channel/${channelId}` : demoChannelUrl}
          aria-label={`Open channel ${channelTitle}`}
          sx={{ flexShrink: 0, height: 'fit-content' }}
        >
          <Avatar
            alt={channelTitle}
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.main',
              fontSize: 16,
            }}
          >
            {channelTitle.charAt(0).toUpperCase()}
          </Avatar>
        </Link>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Link
            to={videoId ? `/video/${videoId}` : demoVideoUrl}
            aria-label={`Open video ${title}`}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="text.primary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.3,
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
          </Link>
          <Link
            to={channelId ? `/channel/${channelId}` : demoChannelUrl}
            aria-label={`Open channel ${channelTitle}`}
            sx={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mr: 0.5 }}
            >
              {channelTitle}
            </Typography>
            <CheckCircle
              aria-hidden="true"
              sx={{ fontSize: 12, color: 'custom.verifiedBadge' }}
            />
          </Link>
          <Box>
            {snippet?.publishedAt && (
              <Typography variant="caption" color="text.secondary">
                {formatRelativeTime(snippet.publishedAt)}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
