import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import {
  PlaylistAdd,
  CheckCircleOutline,
  CheckCircle,
} from '@mui/icons-material';
import {
  getPlaylists,
  createPlaylist,
  addToPlaylist,
  isInPlaylist,
} from '../../utils/playlists';

const PlaylistMenu = ({ open, onClose, video }) => {
  const [playlists, setPlaylists] = useState(() => getPlaylists());
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const refresh = () => setPlaylists(getPlaylists());

  const handleToggle = (playlistId) => {
    if (isInPlaylist(playlistId, video.id)) {return;}
    addToPlaylist(playlistId, video);
    refresh();
  };

  const handleCreate = () => {
    if (!newName.trim()) {return;}
    const p = createPlaylist(newName.trim());
    addToPlaylist(p.id, video);
    setNewName('');
    setCreating(false);
    refresh();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>Save to playlist</DialogTitle>
      <List sx={{ pt: 0 }}>
        {playlists.map((p) => {
          const inList = isInPlaylist(p.id, video.id);
          return (
            <ListItemButton
              key={p.id}
              onClick={() => handleToggle(p.id)}
              disabled={inList}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {inList ? (
                  <CheckCircle sx={{ color: 'primary.main', fontSize: 20 }} />
                ) : (
                  <CheckCircleOutline
                    sx={{ color: 'text.secondary', fontSize: 20 }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={p.name}
                primaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.primary',
                }}
                secondary={`${p.videos.length} videos`}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItemButton>
          );
        })}
      </List>
      {creating ? (
        <Stack direction="row" spacing={1} sx={{ px: 3, pb: 2 }}>
          <TextField
            size="small"
            placeholder="Playlist name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
            sx={{ flex: 1 }}
          />
          <Button variant="contained" size="small" onClick={handleCreate}>
            Create
          </Button>
        </Stack>
      ) : (
        <Button
          startIcon={<PlaylistAdd />}
          onClick={() => setCreating(true)}
          sx={{ mx: 2, mb: 2, textTransform: 'none' }}
        >
          New playlist
        </Button>
      )}
    </Dialog>
  );
};

export default PlaylistMenu;
