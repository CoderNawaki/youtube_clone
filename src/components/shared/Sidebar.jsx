import { memo } from 'react';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../utils/constants';

const Sidebar = memo(({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();

  return (
    <Stack
      component="nav"
      aria-label="Video categories"
      direction="column"
      sx={{
        overflow: 'auto',
        height: { sx: 'auto', md: '95%' },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          aria-pressed={category.name === selectedCategory}
          onClick={() =>
            category.route
              ? navigate(category.route)
              : setSelectedCategory(category.name)
          }
          style={{
            background: category.name === selectedCategory && '#F31503',
            color: 'white',
          }}
          key={category.name}
        >
          <span
            aria-hidden="true"
            style={{
              color: category.name === selectedCategory ? 'white' : '#F31503',
              marginRight: '15px',
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? '1' : '0.8',
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
});

export default Sidebar;
