import { CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchGames } from "../services/api";
import GameGrid from "./GameGrid";
import SearchBar from "./SearchBar";
import GameList from "./GameList";

const Home = (props) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialGames = async () => {
      setLoading(true);
      const initialGames = await fetchGames();
      setGames(initialGames);
      setLoading(false);
    };
    loadInitialGames();
  }, []);

  const handleSearch = async (query, genre, score, platform) => {
    setLoading(true);
    const gameResults = await fetchGames(query, genre, score, platform);
    setGames(gameResults);
    setLoading(false);
  };
  return (
    <div className="home-container">
      <div className="sidebar">
        <SearchBar onSearch={handleSearch} darkMode={props.darkMode} />
      </div>
      <div>
        {loading ? (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    
       ) : props.view === "table" ? (
          <GameList games={games} onSearch={handleSearch} />
        ) : (
          <GameGrid games={games} onSearch={handleSearch} />
        )}
      </div>
    </div>
  );
};

export default Home;
