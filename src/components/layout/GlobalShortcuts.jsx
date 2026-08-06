import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const SHORTCUTS = [
  { keys: '/', action: 'Focus search' },
  { keys: 'Space / K', action: 'Play or pause (video page)' },
  { keys: '← / →', action: 'Seek backward / forward 5s' },
  { keys: 'F', action: 'Toggle fullscreen (video page)' },
  { keys: 'M', action: 'Toggle mute (video page)' },
  { keys: '< / >', action: 'Decrease / increase playback speed' },
  { keys: '?', action: 'Show this help dialog' },
];

const GlobalShortcuts = () => {
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-bar');
        searchInput?.focus();
      }

      if (e.key === '?') {
        e.preventDefault();
        setHelpOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Dialog open={helpOpen} onClose={() => setHelpOpen(false)} maxWidth="sm">
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" color="text.primary">
            Keyboard shortcuts
          </Typography>
          <IconButton
            aria-label="Close shortcuts"
            onClick={() => setHelpOpen(false)}
            sx={{ color: 'text.secondary' }}
          >
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Table size="small">
          <TableBody>
            {SHORTCUTS.map((shortcut) => (
              <TableRow key={shortcut.keys}>
                <TableCell sx={{ width: '40%', whiteSpace: 'nowrap' }}>
                  <Typography
                    component="kbd"
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderRadius: 0.5,
                      bgcolor: 'action.hover',
                      border: '1px solid',
                      borderColor: 'divider',
                      fontWeight: 'bold',
                      color: 'text.primary',
                    }}
                  >
                    {shortcut.keys}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {shortcut.action}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalShortcuts;
