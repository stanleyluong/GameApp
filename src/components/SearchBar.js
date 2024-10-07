// /src/components/SearchBar/SearchBar.js

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
import { dark } from "@mui/material/styles/createPalette";

const SearchBar = ({ onSearch, darkMode }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [score, setScore] = useState([0, 100]); // Set score as a range
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  // Fetch genres and platforms on component mount
  useEffect(() => {
    const loadFilters = async () => {
      const genresData = await fetchGenres();
      const platformsData = await fetchPlatforms();
      const sortedGenres = genresData.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      const sortedPlatforms = platformsData.sort((a, b) =>
        a.name.localeCompare(b.name),
      );

      setGenres(sortedGenres);
      setPlatforms(sortedPlatforms);
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
  // const getLabelColor = () => {
  //   return score[0] === 0 && score[1] === 100 ? "#717171" : "black";
  // };
  console.log("darkmode", darkMode.darkMode);

  const textFieldColor = () => {
    if (darkMode.darkMode) {
      return score[0] === 0 && score[1] === 100 ? "#c1c1c1" : "#fff";
    } else {
      return score[0] === 0 && score[1] === 100 ? "#717171" : "black";
    }
  };
  // const textFieldColor = darkMode ? "#fff" : "#000"; // Change text color based on dark mode
  // const borderColor = darkMode ?  "" : "rgb(203, 203, 203" ;
  const border = darkMode.darkMode
    ? "1px solid rgba(255, 255, 255, 0.23)"
    : "1px solid silver";
  const borderHover = darkMode.darkMode ? "#fff" : "black";
  const marks = [
    { value: 0, label: "0" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
    { value: 60, label: "60" },
    { value: 70, label: "70" },
    { value: 80, label: "80" },
    { value: 90, label: "90" },
    { value: 100, label: "100" },
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ marginBottom: 2 }}
      className="navbar"
    >
      {/* Search Input */}
      <TextField
        className="navbar-item"
        label="Search for a game..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: 2, width: "100%" }}
      />

      {/* Genre Filter */}
      <FormControl fullWidth sx={{ marginBottom: 2 }} className="navbar-item">
        <InputLabel>Genre</InputLabel>
        <Select
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Platform Filter */}
      <FormControl fullWidth sx={{ marginBottom: 2 }} className="navbar-item">
        <InputLabel>Platform</InputLabel>
        <Select
          label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <MenuItem value="">All Platforms</MenuItem>
          {platforms.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        className="navbar-item"
        fullWidth
        sx={{
          marginBottom: 2,
          borderRadius: "4px",
          border: border,
          transition: "border-color 0.3s ease", // Only the border will transition
          "&:hover": {
            borderColor: borderHover, // Change only the border color on hover
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            color: textFieldColor,
            paddingLeft: "12px",
            paddingTop: "10px",
          }}
        >
          Metacritic Score Range
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Slider
            label="Metacritic"
            className="navbar-item"
            value={score}
            onChange={handleScoreChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
            marks={marks}
            sx={{
              width: "98%", // Adjust this value to control slider width
              color: "grey",
            }}
          />
        </Box>
      </FormControl>

      <Button
        className="navbar-item"
        variant="contained"
        type="submit"
        fullWidth
        // sx={{ backgroundColor: "#2c2c2c" }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
