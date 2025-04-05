"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Default MUI blue
    },
    secondary: {
      main: "#dc004e", // Default MUI red
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default theme;
