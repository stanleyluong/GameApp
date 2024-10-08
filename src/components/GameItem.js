import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import platformIcons from "../utils/platformIcons";

const GameItem = ({ game }) => {
  return (
    <Link
      to={`/game/${game.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card sx={{ maxWidth: 345, margin: "15px", backgroundColor: "#2c2c2c" }}>
        {/* Game Image */}
        <CardMedia
          component="img"
          height="140"
          image={game.background_image || "placeholder.jpg"}
          alt={game.name}
        />

        {/* Game Details */}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color="#fff">
            {game.name}
          </Typography>
          <Typography variant="body2" color="#b0b0b0">
            Released: {game.released}
          </Typography>
          <Typography variant="body2" color="#b0b0b0">
            Metacritic: {game.metacritic || "N/A"}
          </Typography>

          {/* Game Platforms */}
          <Box sx={{ display: "flex", gap: 1, marginTop: "10px" }}>
            {game.parent_platforms?.map((platformObj) => (
              <Box
                key={platformObj.platform.id}
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#000",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    platformIcons[platformObj.platform.name] ||
                    "default-platform-icon.svg"
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default GameItem;
