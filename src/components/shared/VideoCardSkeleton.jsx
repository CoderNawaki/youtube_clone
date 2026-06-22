import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';

const VideoCardSkeleton = () => (
  <Card
    sx={{
      width: { xs: '100%', sm: '358px', md: '320px' },
      boxShadow: 'none',
      borderRadius: 0,
    }}
  >
    <Skeleton
      variant="rectangular"
      sx={{
        width: { xs: '100%', sm: '358px' },
        height: 180,
        bgcolor: 'custom.skeletonDark',
      }}
    />
    <CardContent
      sx={{
        bgcolor: 'background.paper',
        height: 'auto',
        minHeight: 100,
        p: 1.5,
        display: 'flex',
        gap: 1.5,
      }}
    >
      <Skeleton
        variant="circular"
        sx={{
          width: 36,
          height: 36,
          bgcolor: 'custom.skeletonMid',
          flexShrink: 0,
        }}
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack spacing={0.8}>
          <Skeleton
            variant="rounded"
            height={14}
            sx={{ bgcolor: 'custom.skeletonLight' }}
          />
          <Skeleton
            variant="rounded"
            height={14}
            width="60%"
            sx={{ bgcolor: 'custom.skeletonLight' }}
          />
          <Skeleton
            variant="rounded"
            height={12}
            width="40%"
            sx={{ bgcolor: 'custom.skeletonMid', mt: 0.5 }}
          />
          <Skeleton
            variant="rounded"
            height={12}
            width="25%"
            sx={{ bgcolor: 'custom.skeletonMid' }}
          />
        </Stack>
      </Box>
    </CardContent>
  </Card>
);

const VideoGridSkeleton = ({ count = 8 }) => (
  <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
    {Array.from({ length: count }, (_, i) => (
      <VideoCardSkeleton key={i} />
    ))}
  </Stack>
);

export { VideoCardSkeleton };
export default VideoGridSkeleton;
