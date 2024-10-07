import React, { useEffect, useState } from "react";
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
      console.log("gameData", gameData);
      setGame(gameData);
      setLoading(false);
    };

    loadGameDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="game-details-container">
      <h1 className="game-title">{game.name}</h1>
      <img src={game.background_image} alt={game.name} className="game-image" />

      <div className="game-meta">
        <p>Released: {game.released}</p>
        <p>Metacritic: {game.metacritic}</p>
        <p>Playtime: {game.playtime} hours</p>
        <p>Rating: {game.rating}</p>
        <p>Rating Count: {game.ratings_count}</p>
      </div>

      <div className="game-description">
        <p>{game.description_raw}</p>
      </div>
      <p>Platforms:</p>
      <div>
        {game.parent_platforms.map((platformObj) => (
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
        <div>
          <p>Genres:</p>
          {game.genres.map((genre) => (
            <span key={genre.id} className="genre">
              {genre.name}
            </span>
          ))}
        </div>
      </div>
      <p>Available in Stores:</p>
      <div>
        {game.stores.map((store) => (
          <span key={store.id} className="store">
            {store.store.name}
          </span>
        ))}
      </div>

      <p>Tags:</p>
      <div>
        {game.tags.map((tag) => (
          <span key={tag.id} className="tag">
            {tag.name}
          </span>
        ))}
      </div>

      <p>Developers:</p>
      <div>
        {game.developers.map((developer) => (
          <span key={developer.id} className="developer">
            {developer.name}
          </span>
        ))}
      </div>

      <p>Publishers:</p>
      <div>
        {game.publishers.map((publisher) => (
          <span key={publisher.id} className="publisher">
            {publisher.name}
          </span>
        ))}
      </div>

      <div className="game-screenshots">
        <p>Screenshots:</p>
        {game.screenshots?.map((screenshot, index) => (
          <img
            key={index}
            src={screenshot.image}
            alt="screenshot"
            className="game-screenshot"
          />
        ))}
      </div>

      {game.website && (
        <div className="game-website">
          <p>
            Official Website:{" "}
            <a href={game.website} target="_blank" rel="noopener noreferrer">
              {game.website}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
