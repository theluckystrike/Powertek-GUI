import { createTheme } from "@mui/material/styles";

const baseTypography = {
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    '"Fira Sans"',
    '"Droid Sans"',
    '"Helvetica Neue"',
    "sans-serif",
  ].join(","),
};

// Define common styles
const commonStyles = {
  typography: {
    ...baseTypography,
  },
  // Other common styles
};

// Light theme
export const lightTheme = createTheme({
  ...commonStyles,
  palette: {
    mode: "light",
    primary: {
      main: "rgba(0, 0, 0, 0.87)",
    },
    // background: {
    //   default: "#f4f5f7",
    //   paper: "#ffffff",
    // },
    // text: {
    //   primary: "#ff0000",
    //   secondary: "#606f7b",
    // },
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...commonStyles,
  palette: {
    mode: "dark",
    // primary: {
    //   main: "#203246",
    // },
    // background: {
    //   default: "#121212",
    //   paper: "#1e1e1e",
    // },
    text: {
      primary: "#e0e0e0",
      secondary: "#a5a5a5",
    },
  },
});
