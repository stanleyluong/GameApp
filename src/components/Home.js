import { CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { fetchGames } from "../services/api";
import GameGrid from "./GameGrid";
import SearchBar from "./SearchBar";
import GameList from "./GameList";

const Home = ({ darkMode, view }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [score, setScore] = useState([0, 100]); // Assuming score is a range

  const location = useLocation();
  const navigate = useNavigate();

  // Load initial games based on URL parameters
  useEffect(() => {
    const params = queryString.parse(location.search);
    const initialQuery = params.search || "";
    const initialGenre = params.genre || "";
    const initialPlatform = params.platform || "";
    const initialScore = params.score ? params.score.split(",").map(Number) : [0, 100];

    setSearchQuery(initialQuery);
    setGenre(initialGenre);
    setPlatform(initialPlatform);
    setScore(initialScore);

    setLoading(true);
    fetchGames(initialQuery, initialGenre, initialScore, initialPlatform).then((data) => {
      setGames(data);
      setLoading(false);
    });
  }, [location.search]);

  // Handle the search and update the URL
  const handleSearch = (query, genre, score, platform) => {
    setLoading(true);

    // Update URL with current search filters
    const params = queryString.stringify({ search: query, genre, platform, score: score.join(",") });
    navigate(`?${params}`, { replace: true });

    // Fetch games with search filters
    fetchGames(query, genre, score, platform).then((gameResults) => {
      setGames(gameResults);
      setLoading(false);
    });
  };

  return (
    <div className="home-container">
      {/* Pass the state and setter functions to SearchBar */}
      <SearchBar
        onSearch={handleSearch}
        darkMode={darkMode}
        query={searchQuery}
        genre={genre}
        platform={platform}
        score={score}
        setSearchQuery={setSearchQuery}
        setGenre={setGenre}
        setPlatform={setPlatform}
        setScore={setScore}
      />
      
      {/* Display the results */}
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
      ) : view === "table" ? (
        <GameList games={games} />
      ) : (
        <GameGrid games={games} />
      )}
    </div>
  );
};

export default Home;
