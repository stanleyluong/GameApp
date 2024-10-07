import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameDetails from "./components/GameDetails";
import Home from "./components/Home";
import "./styles.scss";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import logo from "./assets/logo.webp";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Light theme
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

  // Dark theme
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

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="GameApp Logo"
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
          </Box>

          {/* Dark Mode Toggle Button */}
          <Button variant="contained" onClick={handleToggle}>
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Button>
        </Box>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
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
