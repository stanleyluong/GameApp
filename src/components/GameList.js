import React from "react";
import platformIcons from "../utils/platformIcons";

const GameList = ({ games }) => {
  return (
    <div className="game-list-container">
      <table className="game-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Metacritic Score</th>
            <th>Platforms</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>
                <img
                  className="game-thumbnail"
                  src={game.background_image || "placeholder.jpg"}
                  alt={game.name}
                  width="100"
                />
              </td>
              <td>{game.name}</td>
              <td>{game.released}</td>
              <td>{game.metacritic || "N/A"}</td>
              <td>
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
                      width="20"
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameList;

// import React, { useState } from 'react';
// import ReactPaginate from 'react-paginate'; // Import react-paginate for pagination
// import GameItem from './GameItem'; // Assuming GameItem is in the same folder

// const GameList = ({ games }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 10;  // You can adjust the number of games per page
// console.log('games', games)
//   // Handle page click event
//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   // Calculate which games to display based on the current page
//   const offset = currentPage * itemsPerPage;
//   const currentGames = games.slice(offset, offset + itemsPerPage);

//   return (
//     <div>
//       <div className="game-list">
//         {currentGames.map((game) => (
//           <GameItem key={game.id} game={game} />
//         ))}
//       </div>

//       {/* Pagination controls */}
//       {games.length > itemsPerPage && (
//         <ReactPaginate
//           previousLabel={'Previous'}
//           nextLabel={'Next'}
//           breakLabel={'...'}
//           pageCount={Math.ceil(games.length / itemsPerPage)}  // Calculate total number of pages
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={3}
//           onPageChange={handlePageClick}  // Call this function when a page is clicked
//           containerClassName={'pagination'}
//           activeClassName={'active'}
//           pageClassName={'page-item'}
//           pageLinkClassName={'page-link'}
//           previousClassName={'page-item'}
//           previousLinkClassName={'page-link'}
//           nextClassName={'page-item'}
//           nextLinkClassName={'page-link'}
//           breakClassName={'page-item'}
//           breakLinkClassName={'page-link'}
//         />
//       )}
//     </div>
//   );
// };

// export default GameList;
