import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameDetails from "./components/GameDetails";
import Home from "./components/Home";
import "./styles.css";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

import { useState } from "react";
import logo from "./assets/logo.webp";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState("list"); 
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#3f51b5",
      },
      background: {
        default: "#ffffff",
        paper: "#f4f6f8",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
    },
  });

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const handleViewChange = (event, nextView) => {
    setView(nextView);
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router basename="/GameApp">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <ToggleButtonGroup
            value={darkMode ? "dark" : "light"}
            exclusive
            onChange={handleToggleDarkMode}
            aria-label="mode toggle"
          >
            <ToggleButton value="dark" aria-label="dark mode">
              <DarkModeIcon />
            </ToggleButton>
            <ToggleButton value="light" aria-label="light mode">
              <LightModeIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Link to="/">
            <img
              src={logo}
              alt="GameApp Logo"
              style={{
                width: "100px",
                height: "100px",
                marginRight: "10px",
                borderRadius: "12px", // Add rounded corners
              }}
            />
          </Link>

          <ToggleButtonGroup
            value={view === 'grid' ? 'grid' : 'list'}
            exclusive
            onChange={handleViewChange}
            aria-label="view toggle"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} view={view} />} />
          <Route
            path="/game/:id"
            element={<GameDetails darkMode={darkMode} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
