import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { fetchGames } from "../services/api";
import SearchBar from "./SearchBar";
import GameList from "./GameList";
import { useSearchParams } from "react-router-dom";

const Home = (props) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  // URL search parameters
  const [queryParams, setQueryParams] = useSearchParams();

  // Derive search parameters from the URL
  const query = queryParams.get("query") || "";
  const genre = queryParams.get("genre") || "";
  const platform = queryParams.get("platform") || "";
  const scoreMin = Number(queryParams.get("scoreMin")) || 0;
  const scoreMax = Number(queryParams.get("scoreMax")) || 100;
  const orderBy = queryParams.get("orderBy") || "name";  // Sort by name by default
  const order = queryParams.get("order") || "asc";       // Ascending order by default

  // Load games based on URL search parameters
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      const gameResults = await fetchGames(query, genre, [scoreMin, scoreMax], platform);
      setGames(gameResults);
      setLoading(false);
    };
    loadGames();
  }, [query, genre, platform, scoreMin, scoreMax]);

  // Function to handle search and update query params
  const handleSearch = (query, genre, score, platform) => {
    setQueryParams({
      query,
      genre,
      platform,
      scoreMin: score[0],
      scoreMax: score[1],
      orderBy,  // Keep current sorting
      order,    // Keep current sorting order
    });
  };

  // Function to handle sort change and update query params
  const handleSortChange = (newOrderBy, newOrder) => {
    setQueryParams({
      query,
      genre,
      platform,
      scoreMin,
      scoreMax,
      orderBy: newOrderBy,
      order: newOrder,
    });
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <SearchBar
          onSearch={handleSearch}
          darkMode={props.darkMode}
          initialQuery={query}
          initialGenre={genre}
          initialPlatform={platform}
          initialScore={[scoreMin, scoreMax]}
        />
      </div>
      <div>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <GameList
            games={games}
            orderBy={orderBy}
            order={order}
            onSortChange={handleSortChange}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
