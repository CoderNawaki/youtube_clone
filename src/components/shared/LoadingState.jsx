import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingState = ({ message = 'Loading content...' }) => {
  return (
    <Box
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
    </Box>
  );
};

export default LoadingState;
