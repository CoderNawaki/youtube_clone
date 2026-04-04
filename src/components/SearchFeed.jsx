import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchSearchVideos } from '../utils/fetchFromAPI';
import { Videos, LoadingState, ErrorState } from './';
import { useParams } from 'react-router-dom';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const { searchTerm } = useParams();

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const nextVideos = await fetchSearchVideos(searchTerm);

        if (isMounted) {
          setVideos(nextVideos);
        }
      } catch (error) {
        if (isMounted) {
          setVideos([]);
          setErrorMessage(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      isMounted = false;
    };
  }, [searchTerm, retryCount]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
        Search Results for:
        <span style={{ color: '#F31503' }}>{searchTerm}</span> Videos
      </Typography>

      {isLoading ? (
        <LoadingState message={`Searching for "${searchTerm}"...`} />
      ) : errorMessage ? (
        <ErrorState
          title="Search failed"
          message={errorMessage}
          onRetry={() => setRetryCount((current) => current + 1)}
        />
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default SearchFeed;
