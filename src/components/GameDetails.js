import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../services/api";
import platformIcons from "../utils/platformIcons";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGameDetails = async () => {
      const gameData = await fetchGameDetails(id);
      setGame(gameData);
      setLoading(false);
    };

    loadGameDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
// console.log('gamedata', game)
  return (
    <Box sx={{ padding: "20px" }}>
      <Card sx={{ padding: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {game.name}
        </Typography>
        <img
          src={game.background_image}
          alt={game.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />

        <CardContent>
          <Typography variant="h5" gutterBottom>
            Game Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">Released: {game.released}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">
                Metacritic: {game.metacritic}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">
                Playtime: {game.playtime} hours
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">Rating: {game.rating}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">
                Rating Count: {game.ratings_count}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={2}>
            <Typography variant="h6">Platforms:</Typography>
            <Box display="flex" gap={1}>
              {game.parent_platforms.map((platformObj) => (
                <Box
                  key={platformObj.platform.id}
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#000",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={
                      platformIcons[platformObj.platform.name] 
                    }
                    alt={platformObj.platform.name}
                    title={platformObj.platform.name}
                    style={{
                      width: "20px",
                      height: "20px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Genres:</Typography>
            {game.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{ marginRight: "5px", marginBottom: "5px" }}
              />
            ))}
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Stores:</Typography>
            {game.stores.map((store) => (
              <Chip
                key={store.id}
                label={store.store.name}
                sx={{ marginRight: "5px", marginBottom: "5px" }}
              />
            ))}
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Developers:</Typography>
            {game.developers.map((developer) => (
              <Chip
                key={developer.id}
                label={developer.name}
                sx={{ marginRight: "5px", marginBottom: "5px" }}
              />
            ))}
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Publishers:</Typography>
            {game.publishers.map((publisher) => (
              <Chip
                key={publisher.id}
                label={publisher.name}
                sx={{ marginRight: "5px", marginBottom: "5px" }}
              />
            ))}
          </Box>

          {game.website && (
            <Box mt={2}>
              <Typography variant="h6">
                Official Website:{" "}
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {game.website}
                </a>
              </Typography>
            </Box>
          )}

          <Box mt={2}>
            <Typography variant="h6">Description:</Typography>
            <Typography>{game.description_raw}</Typography>
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Screenshots:</Typography>
            <Grid container spacing={2}>
              {game.screenshots?.map((screenshot, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <img
                    src={screenshot.image}
                    alt={`Screenshot ${index + 1}`}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GameDetails;
