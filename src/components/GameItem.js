import React from "react";
import { Link } from "react-router-dom";
import platformIcons from "../utils/platformIcons"; // Importing the reusable icons

const GameItem = ({ game }) => {
  return (
    <Link
      to={`/game/${game.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="game-item">
        <img
          className="game-thumbnail"
          src={game.background_image || "placeholder.jpg"}
          alt={game.name}
        />
        <div className="game-description">
          <p className="game-name">{game.name}</p>
          <p>Released: {game.released}</p>
          <p>Metacritic: {game.metacritic || "N/A"}</p>

          {/* Display platform icons */}
          <div className="game-platforms">
            {game.parent_platforms?.map((platformObj) => (
              <img
                key={platformObj.platform.id}
                className="game-platform-icon"
                src={
                  platformIcons[platformObj.platform.name] ||
                  "default-platform-icon.svg"
                }
                alt={platformObj.platform.name}
                title={platformObj.platform.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameItem;
