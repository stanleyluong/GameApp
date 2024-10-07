import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import platformIcons from "../utils/platformIcons"; // Import platform icons mapping
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const GameTable = ({ games }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (games.length > 0) {
      setLoading(false); // Set loading to false once games are available
    }
  }, [games]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortGames = (games, comparator) => {
    const stabilizedThis = games.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const filteredGames = sortGames(games, getComparator(order, orderBy));

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleRequestSort("name")}
              >
                Game Name
              </TableSortLabel>
            </TableCell>

            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "released"}
                direction={orderBy === "released" ? order : "asc"}
                onClick={() => handleRequestSort("released")}
              >
                Release Date
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "metacritic"}
                direction={orderBy === "metacritic" ? order : "asc"}
                onClick={() => handleRequestSort("metacritic")}
              >
                Metacritic Score
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Platforms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredGames.map((game) => (
            <TableRow key={game.id} component={Link} to={`/game/${game.id}`}>
              <TableCell>
                <img
                  src={game.background_image || "placeholder.jpg"}
                  alt={game.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </TableCell>
              <TableCell>{game.name}</TableCell>
              <TableCell align="right">{game.released}</TableCell>
              <TableCell align="right">{game.metacritic}</TableCell>
              <TableCell align="right">
                {/* Display platform icons in black circles */}
                <Box display="flex" justifyContent="flex-end" gap={1}>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameTable;
