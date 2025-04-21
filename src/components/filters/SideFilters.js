import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Slider,
  IconButton,
  Collapse,
  Divider,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const categoryData = [
  { label: 'Fertilizers' },
  { label: 'Seeds' },
  { label: 'Irrigation Tools' },
  { label: 'Agricultural Basins' },
  { label: 'Agricultural Tools' },
];

// Side page UI
export const SideFilter = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showPrice, setShowPrice] = useState(true);
  const [showCategories, setShowCategories] = useState(true);

  useEffect(() => {
    props.handlecategoryFilter(selectedCategories, priceRange);
  }, [selectedCategories, priceRange]);

  const handleCategoryChange = (label) => {
    setSelectedCategories((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  console.log("priceRange", priceRange);

  return (
    <Box sx={{ width: 250, padding: "5px 16px 16px 16px" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="600">
          Product Categories
        </Typography>
        <IconButton onClick={() => setShowCategories(!showCategories)} size="small">
          {showCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={showCategories}>
        {categoryData.map((item, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.includes(item.label)}
                  onChange={() => handleCategoryChange(item.label)}
                  sx={{
                    color: 'green',
                    '&.Mui-checked': { color: 'green' },
                  }}
                />
              }
              label={item.label}
            />
          </Box>
        ))}
      </Collapse>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="600">
          Filter by Price
        </Typography>
        <IconButton onClick={() => setShowPrice(!showPrice)} size="small">
          {showPrice ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={showPrice}>
        <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
          Price: ${priceRange[0]} – ${priceRange[1]}
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          min={0}
          max={2000}
          step={50}
          sx={{ color: 'green', width: "220px" }}
        />
      </Collapse>
    </Box>
  );
};