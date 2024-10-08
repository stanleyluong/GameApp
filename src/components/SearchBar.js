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
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ onSearch, darkMode }) => {
  const [queryParams, setQueryParams] = useSearchParams();
  
  const [query, setQuery] = useState(queryParams.get("query") || "");
  const [genre, setGenre] = useState(queryParams.get("genre") || "");
  const [platform, setPlatform] = useState(queryParams.get("platform") || "");
  const [score, setScore] = useState([
    Number(queryParams.get("scoreMin")) || 0,
    Number(queryParams.get("scoreMax")) || 100
  ]);

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

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
  
      if (!sortedGenres.some((g) => g.id === genre)) {
        setGenre("");  
      }
  
      if (!sortedPlatforms.some((p) => p.id === platform)) {
        setPlatform("");  
      }
    };
    loadFilters();
  }, [genre, platform]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    setQueryParams({
      query,
      genre,
      platform,
      scoreMin: score[0],
      scoreMax: score[1],
    });

    onSearch(query, genre, score, platform);
  };

  const handleScoreChange = (event, newValue) => {
    setScore(newValue);
  };

  const textFieldColor = () => {
    if (darkMode) {
      return score[0] === 0 && score[1] === 100 ? "#c1c1c1" : "#fff";
    } else {
      return score[0] === 0 && score[1] === 100 ? "#717171" : "black";
    }
  };
  
  const border = darkMode
    ? "1px solid rgba(255, 255, 255, 0.23)"
    : "1px solid silver";
  const borderHover = darkMode ? "#fff" : "black";

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
      <TextField
        className="navbar-item"
        label="Search for a game..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: 2, width: "100%" }}
      />

      <FormControl fullWidth sx={{ marginBottom: 2 }} className="navbar-item">
        <InputLabel>Genre</InputLabel>
        <Select
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <MenuItem value=''>All Genres</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }} className="navbar-item">
        <InputLabel>Platform</InputLabel>
        <Select
          label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <MenuItem value=''>All Platforms</MenuItem>
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
          transition: "border-color 0.3s ease",
          "&:hover": {
            borderColor: borderHover,
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
              width: "98%",
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
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
