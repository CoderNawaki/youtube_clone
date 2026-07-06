import { memo } from 'react';
import { Chip, Stack, useMediaQuery, useTheme } from '@mui/material';
import { categories } from '../../utils/constants';

const CategoryChips = memo(({ selectedCategory, setSelectedCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!isMobile) {
    return null;
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        overflow: 'auto',
        px: 2,
        py: 1,
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category.name}
          label={category.name}
          onClick={() => setSelectedCategory(category.name)}
          variant={category.name === selectedCategory ? 'filled' : 'outlined'}
          color={category.name === selectedCategory ? 'primary' : 'default'}
          sx={{
            flexShrink: 0,
            borderRadius: 2,
            fontWeight: category.name === selectedCategory ? 'bold' : 'normal',
            color:
              category.name === selectedCategory ? '#fff' : 'text.secondary',
            borderColor: 'divider',
            '&:hover': {
              bgcolor:
                category.name === selectedCategory
                  ? 'primary.dark'
                  : 'action.hover',
            },
          }}
        />
      ))}
    </Stack>
  );
});

export default CategoryChips;
