import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

// assets
import colors from "@public/assets/scss/_themes-vars.module.scss";

// project imports

import themePalette from "./palette";
import themeTypography from "./typography";
import componentStyleOverrides from "./compStyleOverride";
import { ICustomRedux } from "interfaces";
import { IColors } from "interfaces/colors";

declare module "@mui/material/styles" {
  interface PaletteColor {
    color200: string;
    color800: string;
  }
}

export interface IThemeServer {
  colors: IColors;
  heading: string;
  paper: string;
  backgroundDefault: string;
  background: string;
  darkTextPrimary: string;
  darkTextSecondary: string;
  textDark: string;
  menuSelected: string;
  menuSelectedBack: string;
  divider: string;
  customization: ICustomRedux;
  grey500?: string;
}

export const theme = (customization: ICustomRedux) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.primaryLight,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.grey900,
    menuSelectedBack: color.primaryLight,
    divider: color.grey300,
    customization,
  };

  const themeOptions: ThemeOptions = {
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
