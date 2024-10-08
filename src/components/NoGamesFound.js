import React from "react";
import EmptyStoreImage from "../assets/no_games-Found.webp"; // Adjust the path to where you store the image

const NoGamesFound = () => (
  <div style={{ textAlign: "center" }}>
    <img
      src={EmptyStoreImage}
      alt="No Games Found"
      style={{ width: "100%", maxWidth: "400px" }}
    />
  </div>
);

export default NoGamesFound;
