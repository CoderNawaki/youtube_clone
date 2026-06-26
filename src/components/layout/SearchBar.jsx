import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { Close, History, Search } from '@mui/icons-material';
import { usePersistedState } from '../../hooks';

const MAX_HISTORY = 5;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = usePersistedState(
    'yt_search_history',
    []
  );
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();

  const addToHistory = (term) => {
    const filtered = searchHistory.filter((t) => t !== term);
    setSearchHistory([term, ...filtered].slice(0, MAX_HISTORY));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      addToHistory(searchTerm);
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
      setFocused(false);
    }
  };

  const handleHistoryClick = (term) => {
    addToHistory(term);
    navigate(`/search/${term}`);
    setSearchTerm('');
    setFocused(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSearchHistory([]);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search videos"
        sx={{
          borderRadius: 20,
          border: '1px solid',
          borderColor: 'custom.searchBorder',
          pl: 2,
          boxShadow: 'none',
          mr: { sm: 5 },
        }}
      >
        <input
          className="search-bar"
          aria-label="Search videos"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />
        <IconButton
          type="submit"
          aria-label="Submit search"
          sx={{ p: '10px', color: 'primary.main' }}
        >
          <Search />
        </IconButton>
      </Paper>
      {focused && searchHistory.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            mr: { sm: 5 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1300,
            overflow: 'hidden',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={2}
            py={0.5}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Recent searches
            </Typography>
            <IconButton
              size="small"
              onClick={handleClear}
              aria-label="Clear search history"
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
          {searchHistory.map((term) => (
            <Box
              key={term}
              display="flex"
              alignItems="center"
              gap={1}
              px={2}
              py={1}
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onMouseDown={() => handleHistoryClick(term)}
            >
              <History
                fontSize="small"
                sx={{ color: 'text.secondary', flexShrink: 0 }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {term}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
