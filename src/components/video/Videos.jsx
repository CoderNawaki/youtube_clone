import { Stack, Box } from '@mui/material';

import { EmptyState } from '../';
import ChannelCard from './ChannelCard';
import VideoCard from './VideoCard';
const Videos = ({ videos, direction }) => {
  if (!videos?.length) {
    return (
      <EmptyState
        title="No videos available"
        message="Try another category or search term."
      />
    );
  }

  return (
    <Stack
      direction={direction || 'row'}
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
