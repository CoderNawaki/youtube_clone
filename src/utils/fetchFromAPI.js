import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const RAPID_API_HOST = 'youtube-v31.p.rapidapi.com';

export class ApiError extends Error {
  constructor(message, { code = 'API_ERROR', status, cause } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.cause = cause;
  }
}

const getRequestOptions = () => {
  const apiKey = process.env.REACT_APP_RAPID_API_KEY;

  if (!apiKey) {
    throw new ApiError('Missing RapidAPI key. Set REACT_APP_RAPID_API_KEY.', {
      code: 'CONFIG_ERROR',
    });
  }

  return {
    params: {
      maxResults: '50',
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': RAPID_API_HOST,
    },
  };
};

const ensureApiResponse = (data) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new ApiError('The API returned an invalid response payload.', {
      code: 'INVALID_RESPONSE',
    });
  }

  if ('items' in data && !Array.isArray(data.items)) {
    throw new ApiError('The API response items field is invalid.', {
      code: 'INVALID_RESPONSE',
    });
  }

  return data;
};

const mapApiError = (error) => {
  if (error instanceof ApiError) {
    return error;
  }

  const status = error.response?.status;

  if (status === 401 || status === 403) {
    return new ApiError(
      'The YouTube API request was rejected. Check the API key and quota.',
      {
        code: 'AUTH_ERROR',
        status,
        cause: error,
      }
    );
  }

  if (status === 429) {
    return new ApiError('Rate limit reached. Please try again later.', {
      code: 'RATE_LIMIT',
      status,
      cause: error,
    });
  }

  if (status >= 500) {
    return new ApiError('The YouTube API is temporarily unavailable.', {
      code: 'SERVER_ERROR',
      status,
      cause: error,
    });
  }

  if (error.request) {
    return new ApiError('Network error. Check your connection and try again.', {
      code: 'NETWORK_ERROR',
      status,
      cause: error,
    });
  }

  return new ApiError('Unexpected error while loading data from the API.', {
    code: 'UNKNOWN_ERROR',
    status,
    cause: error,
  });
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, getRequestOptions());
    return ensureApiResponse(data);
  } catch (error) {
    throw mapApiError(error);
  }
};

export const fetchSearchVideos = async (query) => {
  const data = await fetchFromAPI(`search?part=snippet&q=${query}`);
  return data.items ?? [];
};

export const fetchVideoDetails = async (id) => {
  const data = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
  return data.items?.[0] ?? null;
};

export const fetchRelatedVideos = async (id) => {
  const data = await fetchFromAPI(
    `search?part=snippet&relatedToVideoId=${id}&type=video`
  );
  return data.items ?? [];
};

export const fetchChannelDetails = async (id) => {
  const data = await fetchFromAPI(`channels?part=snippet,statistics&id=${id}`);
  return data.items?.[0] ?? null;
};

export const fetchChannelVideos = async (id) => {
  const data = await fetchFromAPI(
    `search?channelId=${id}&part=snippet&order=date`
  );
  return data.items ?? [];
};
