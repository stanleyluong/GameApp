import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchGames } from "../services/api";
import GameList from "./GameList";
import SearchBar from "./SearchBar";
import GameTable from "./GameTable";

const Home = (darkMode) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initial load of games when the component mounts
  useEffect(() => {
    const loadInitialGames = async () => {
      setLoading(true);
      const initialGames = await fetchGames(); // Fetch without parameters
      setGames(initialGames);
      setLoading(false);
    };
    loadInitialGames();
  }, []);

  const handleSearch = async (query, genre, score, platform) => {
    setLoading(true);
    const gameResults = await fetchGames(query, genre, score, platform);
    console.log("gameResults", gameResults);
    setGames(gameResults);
    setLoading(false);
  };

  return (
    <div className="home-container">
      {/* Search bar on the left */}
      <div className="sidebar">
        <SearchBar onSearch={handleSearch} darkMode={darkMode} />
      </div>

      {/* Game list on the right */}
      {/* <div>{loading ? <CircularProgress /> : <GameList games={games} />}</div> */}
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <GameTable games={games} onSearch={handleSearch} />
        )}
      </div>
    </div>
  );
};

export default Home;
