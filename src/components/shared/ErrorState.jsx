import { Box, Button, Typography } from '@mui/material';

const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry,
}) => {
  return (
    <Box
      role="alert"
      minHeight="40vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      px={3}
      textAlign="center"
    >
      <Typography color="text.primary" variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body1">
        {message}
      </Typography>
      {onRetry ? (
        <Button
          variant="contained"
          onClick={onRetry}
          sx={{ bgcolor: 'primary.main' }}
        >
          Try again
        </Button>
      ) : null}
    </Box>
  );
};

export default ErrorState;
