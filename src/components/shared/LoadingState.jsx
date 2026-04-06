import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

const LoadingState = ({ message = 'Loading content...' }) => {
  return (
    <Box
      role="status"
      aria-live="polite"
      minHeight="40vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      px={3}
    >
      <CircularProgress sx={{ color: '#f31503' }} />
      <Typography color="#fff" variant="body1">
        {message}
      </Typography>
      <Stack width="100%" maxWidth="420px" spacing={1}>
        <Skeleton variant="rounded" height={20} sx={{ bgcolor: '#2d2d2d' }} />
        <Skeleton variant="rounded" height={20} sx={{ bgcolor: '#242424' }} />
        <Skeleton variant="rounded" height={120} sx={{ bgcolor: '#1d1d1d' }} />
      </Stack>
    </Box>
  );
};

export default LoadingState;
