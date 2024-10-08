import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchGenres, fetchPlatforms } from "../services/api";

const SearchBar = ({
  onSearch,
  darkMode,
  query,
  genre,
  platform,
  score,
  setSearchQuery,
  setGenre,
  setPlatform,
  setScore,
}) => {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

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
    onSearch(query, genre, score, platform);
  };

  const handleScoreChange = (event, newValue) => {
    setScore(newValue);
  };

  const textFieldColor = darkMode
    ? score[0] === 0 && score[1] === 100
      ? "#c1c1c1"
      : "#fff"
    : score[0] === 0 && score[1] === 100
    ? "#717171"
    : "black";

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
      <TextField
        label="Search for a game..."
        variant="outlined"
        value={query}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2, width: "100%" }}
      />

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

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Typography sx={{ fontWeight: 400, color: textFieldColor, paddingLeft: "12px", paddingTop: "10px" }}>
          Metacritic Score Range
        </Typography>
        <Slider
          value={score}
          onChange={handleScoreChange}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          step={1}
        />
      </FormControl>

      <Button variant="contained" type="submit" fullWidth>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
