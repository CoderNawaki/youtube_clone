import { Box, Typography } from '@mui/material';

const EmptyState = ({
  title = 'No content found',
  message = 'Try a different search or category.',
}) => {
  return (
    <Box
      aria-live="polite"
      minHeight="30vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
      px={3}
      textAlign="center"
    >
      <Typography color="text.primary" variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;
