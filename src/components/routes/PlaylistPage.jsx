import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack, Delete } from '@mui/icons-material';
import { getPlaylist, deletePlaylist } from '../../utils/playlists';
import { EmptyState, Videos } from '../';

const toVideoItem = (v) => ({
  id: { videoId: v.id },
  snippet: {
    title: v.title,
    channelTitle: v.channelTitle,
    channelId: v.channelId,
    thumbnails: { high: { url: v.thumbnail } },
  },
});

const PlaylistPage = () => {
  const { id } = useParams();
  const playlist = useMemo(() => getPlaylist(id), [id]);

  if (!playlist) {
    return (
      <EmptyState
        title="Playlist not found"
        message="This playlist may have been deleted."
      />
    );
  }

  const videos = playlist.videos.map(toVideoItem);

  return (
    <Box component="main" p={2} sx={{ pb: { xs: 7, md: 2 } }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <IconButton
          component={Link}
          to="/you"
          aria-label="Back to You"
          sx={{ color: 'text.primary' }}
        >
          <ArrowBack />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            {playlist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {playlist.videos.length} videos
          </Typography>
        </Box>
        <IconButton
          aria-label="Delete playlist"
          onClick={() => {
            deletePlaylist(id);
          }}
          component={Link}
          to="/you"
          sx={{ color: 'text.secondary' }}
        >
          <Delete />
        </IconButton>
      </Box>
      {videos.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No videos in this playlist yet.
        </Typography>
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default PlaylistPage;
