import {createMuiTheme} from "@material-ui/core";
import {grey} from '@material-ui/core/colors'
import React from "react";
import {Overrides} from "@material-ui/core/styles/overrides";
import {TypographyOptions} from "@material-ui/core/styles/createTypography";

const overrides: Overrides = {
  MuiToolbar: {
    regular: {
      '@media (min-width: 600px)': {
        minHeight: "auto"
      },
      '@media (min-width: 0px) and (orientation: landscape)': {
        minHeight: "48px"
      },
      minHeight: "auto"
    }
  }
};

const typography: TypographyOptions = {
  // Use the system font instead of the default Roboto font.
  fontFamily: [
    'sans-serif'
  ].join(',')
};

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      default: grey[200]
    },
  },
  typography,
  overrides
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#a6d4fa",
      main: "#90caf9",
      dark: "#648dae"
    },
    secondary: {
      light: "#f6a5c0",
      main: "#f48fb1",
      dark: "#aa647b"
    }
  },
  typography,
  overrides
});

export const ThemeSetterContext = React.createContext<any>(null);
