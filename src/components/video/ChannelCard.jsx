import { Box, CardContent, CardMedia, Typography } from '@mui/material';

import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { demoProfilePicture } from '../../utils/constants';

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

const ChannelCard = ({ channelDetail, marginTop }) => {
  const channelId = channelDetail?.id?.channelId || channelDetail?.id;
  const title = channelDetail?.snippet?.title;
  const subscriberCount = channelDetail?.statistics?.subscriberCount;

  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: { xs: '356px', md: '320px' },
        height: '326px',
        margin: 'auto',
        marginTop,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Link
        to={`/channel/${channelId}`}
        aria-label={`Open channel ${title || 'channel'}`}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'text.primary',
          }}
        >
          <CardMedia
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={title}
            sx={{
              borderRadius: '50%',
              height: '180px',
              width: '180px',
              mb: 2,
              border: '1px solid',
              borderColor: 'custom.channelCardBorder',
            }}
          />
          <Typography variant="h6">
            {title}
            <CheckCircle
              aria-hidden="true"
              sx={{ fontSize: 12, color: 'custom.verifiedBadge', ml: '5px' }}
            />
          </Typography>
          {subscriberCount && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {abbreviateNumber(subscriberCount)} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
