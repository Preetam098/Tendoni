import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#DBAA00",
    },
    secondary: {
      main: "#303D53",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
