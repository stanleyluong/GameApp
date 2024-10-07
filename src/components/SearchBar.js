// /src/components/SearchBar/SearchBar.js

import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchGenres, fetchPlatforms } from '../services/api';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [score, setScore] = useState([0, 100]);  // Set score as a range
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  // Fetch genres and platforms on component mount
  useEffect(() => {
    const loadFilters = async () => {
      const genresData = await fetchGenres();
      const platformsData = await fetchPlatforms();
      setGenres(genresData);
      setPlatforms(platformsData);
    };
    loadFilters();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure that we are passing the date in the correct format
    onSearch(query, genre, score, platform);
  };
  const handleScoreChange = (event, newValue) => {
    setScore(newValue); // Update score state when slider changes
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
      {/* Search Input */}
      <TextField
        label="Search for a game..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: 2, width: '100%' }}
      />

      {/* Genre Filter */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Genre</InputLabel>
        <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

     
      {/* Platform Filter */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Platform</InputLabel>
        <Select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <MenuItem value="">All Platforms</MenuItem>
          {platforms.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl 
  fullWidth 
  sx={{ 
    marginBottom: 2, 
     
    borderRadius: '4px', 
    border: '1px solid #444', 
    borderColor: '#CBCBCB',
    transition: 'border-color 0.3s ease',  // Only the border will transition
    '&:hover': { 
      borderColor: '#3b3b3b'  // Change only the border color on hover
    }
  }}
>
  {/* Move label above slider */}
  <Typography sx={{ fontWeight: 400, color: '#717171', paddingLeft: '12px', paddingTop: '10px', }}>
    Metacritic Score Range
  </Typography>

  <Slider
    value={score}
    onChange={handleScoreChange}
    valueLabelDisplay="auto"
    min={0}
    max={100}
    step={1}
    sx={{ 
      
      // width: '100%',
      color: 'black',  // Adjust slider color as needed
      '& .MuiSlider-thumb': { backgroundColor: 'black' }, // Thumb color
      '& .MuiSlider-track': { backgroundColor: 'black' } // Track color
    }}
  />
</FormControl>


      <Button variant="contained" type="submit" fullWidth  sx={{ backgroundColor: '#2c2c2c' }} >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
