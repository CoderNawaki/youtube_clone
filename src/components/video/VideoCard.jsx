import { Link } from 'react-router-dom';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

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
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '358px', md: '320px' },
        boxShadow: 'none',
        borderRadius: '0',
      }}
    >
      <Link
        to={videoId ? `/video/${videoId}` : demoVideoUrl}
        aria-label={`Open video ${snippet?.title || demoVideoTitle}`}
      >
        <CardMedia
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
        <Link
          to={videoId ? `/video/${videoId}` : demoVideoUrl}
          aria-label={`Open video ${snippet?.title || demoVideoTitle}`}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
          aria-label={`Open channel ${snippet?.channelTitle || demoChannelTitle}`}
        >
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
          </Typography>
          <CheckCircle
            aria-hidden="true"
            sx={{ fontSize: 12, color: 'gray', ml: '5px' }}
          />
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
