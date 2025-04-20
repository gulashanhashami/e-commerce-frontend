import React, { useState } from 'react';
import {
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
} from '@mui/material';

export const ProductDropdown = ({ onSortChange }) => {
  const [sort, setSort] = useState('');

  const handleChange = (e) => {
    setSort(e.target.value);
    onSortChange?.(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
      }}
    >
      <Typography variant="body1" fontWeight="500">
        Sort By:
      </Typography>

      <FormControl size="small" sx={{ minWidth: 150, border:'none', }}>
        <Select
          value={sort}
          onChange={handleChange}
          displayEmpty
          sx={{
            fontSize: '14px',
            height: '36px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
            '& .MuiSelect-select': {
              padding: '6px 12px 6px 0px',
            },
          }}
        >
          <MenuItem value="" disabled>
            Select...
          </MenuItem>
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};