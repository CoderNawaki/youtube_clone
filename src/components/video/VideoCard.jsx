import { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  Bookmark,
  BookmarkBorder,
  CheckCircle,
  PlaylistAdd,
} from '@mui/icons-material';

import { formatRelativeTime } from '../../utils/formatRelativeTime';
import {
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from '../../utils/constants';
import { isInWatchLater, toggleWatchLater } from '../../utils/watchLater';
import PlaylistMenu from '../shared/PlaylistMenu';

const VideoCard = memo(
  ({
    video: {
      id: { videoId },
      snippet,
    },
  }) => {
    const [saved, setSaved] = useState(isInWatchLater(videoId));
    const [playlistOpen, setPlaylistOpen] = useState(false);
    const title = snippet?.title || demoVideoTitle;
    const channelTitle = snippet?.channelTitle || demoChannelTitle;
    const channelId = snippet?.channelId;

    const handleToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWatchLater({
        id: videoId,
        title,
        channelTitle,
        channelId,
        thumbnail: snippet?.thumbnails?.high?.url,
      });
      setSaved((s) => !s);
    };

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
        <Box sx={{ position: 'relative' }}>
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
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              position: 'absolute',
              bottom: 4,
              right: 4,
            }}
          >
            <IconButton
              aria-label={
                saved ? 'Remove from watch later' : 'Save to watch later'
              }
              onClick={handleToggle}
              size="small"
              sx={{
                bgcolor: 'rgba(0,0,0,0.7)',
                color: saved ? 'primary.main' : '#fff',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' },
                opacity: { xs: 1, sm: 0.9 },
              }}
            >
              {saved ? (
                <Bookmark fontSize="small" />
              ) : (
                <BookmarkBorder fontSize="small" />
              )}
            </IconButton>
            <IconButton
              aria-label="Save to playlist"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPlaylistOpen(true);
              }}
              size="small"
              sx={{
                bgcolor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' },
                opacity: { xs: 1, sm: 0.9 },
              }}
            >
              <PlaylistAdd fontSize="small" />
            </IconButton>
          </Stack>
          <PlaylistMenu
            open={playlistOpen}
            onClose={() => setPlaylistOpen(false)}
            video={{
              id: videoId,
              title,
              channelTitle,
              channelId,
              thumbnail: snippet?.thumbnails?.high?.url,
            }}
          />
        </Box>
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
  }
);

export default VideoCard;
