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
      <CircularProgress sx={{ color: 'primary.main' }} />
      <Typography color="#fff" variant="body1">
        {message}
      </Typography>
      <Stack width="100%" maxWidth="420px" spacing={1}>
        <Skeleton
          variant="rounded"
          height={20}
          sx={{ bgcolor: 'custom.skeletonLight' }}
        />
        <Skeleton
          variant="rounded"
          height={20}
          sx={{ bgcolor: 'custom.skeletonMid' }}
        />
        <Skeleton
          variant="rounded"
          height={120}
          sx={{ bgcolor: 'custom.skeletonDark' }}
        />
      </Stack>
    </Box>
  );
};

export default LoadingState;
