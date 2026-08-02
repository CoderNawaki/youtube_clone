import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Speed,
  PictureInPictureAlt,
  Fullscreen,
  FullscreenExit,
} from '@mui/icons-material';

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const PlayerControls = ({ playbackRate, onRateChange, playerRef }) => {
  const [speedAnchor, setSpeedAnchor] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const container = playerRef?.current?.getContainer?.();
    if (!container) {
      return;
    }
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  const handlePip = async () => {
    const internal = playerRef?.current?.getInternalPlayer?.();
    if (!internal) {
      return;
    }
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (internal.getIframe) {
        await internal.getIframe().requestPictureInPicture();
      }
    } catch {
      // PIP not available
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      spacing={0.5}
      sx={{ px: 0.5, py: 0.25 }}
    >
      <Tooltip title="Playback speed">
        <IconButton
          size="small"
          onClick={(e) => setSpeedAnchor(e.currentTarget)}
          sx={{ color: 'text.secondary' }}
        >
          <Speed fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={speedAnchor}
        open={Boolean(speedAnchor)}
        onClose={() => setSpeedAnchor(null)}
      >
        {SPEEDS.map((s) => (
          <MenuItem
            key={s}
            selected={s === playbackRate}
            onClick={() => {
              onRateChange(s);
              setSpeedAnchor(null);
            }}
          >
            <Typography
              variant="body2"
              fontWeight={s === playbackRate ? 'bold' : 'normal'}
            >
              {s === 1 ? 'Normal' : `${s}x`}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      <Tooltip title="Picture-in-picture">
        <IconButton
          size="small"
          onClick={handlePip}
          sx={{ color: 'text.secondary' }}
        >
          <PictureInPictureAlt fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
        <IconButton
          size="small"
          onClick={toggleFullscreen}
          sx={{ color: 'text.secondary' }}
        >
          {isFullscreen ? (
            <FullscreenExit fontSize="small" />
          ) : (
            <Fullscreen fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default PlayerControls;
