import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import GameItem from "./GameItem";

const GameGrid = ({ games }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 40;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentGames = games.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="game-grid">
        {currentGames.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>

      {games.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(games.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />
      )}
    </div>
  );
};

export default GameGrid;
