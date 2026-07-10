import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const formatSubDate = (dateStr) => {
  if (!dateStr) {return null;}
  const days = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days === 0) {return 'Subscribed today';}
  if (days === 1) {return 'Subscribed yesterday';}
  if (days < 30) {return `Subscribed ${days} days ago`;}
  const months = Math.floor(days / 30);
  if (months === 1) {return 'Subscribed 1 month ago';}
  return `Subscribed ${months} months ago`;
};

const SubscriptionCard = ({ sub }) => {
  const timeAgo = useMemo(
    () => formatSubDate(sub.subscribedAt),
    [sub.subscribedAt]
  );

  return (
    <Box
      component={Link}
      to={`/channel/${sub.id}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        borderRadius: 2,
        textDecoration: 'none',
        transition: 'background-color 0.2s',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Avatar
        src={sub.thumbnail}
        alt={sub.title}
        sx={{ width: 48, height: 48 }}
      >
        {sub.title?.charAt(0)}
      </Avatar>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="text.primary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {sub.title}
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
        {timeAgo && (
          <Typography variant="caption" color="text.secondary">
            {timeAgo}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SubscriptionCard;
