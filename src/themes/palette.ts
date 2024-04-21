import { PaletteOptions } from "@mui/material/styles/createPalette";
import { ICustomRedux } from "interfaces";
import { IColors } from "interfaces/colors";

declare module "@mui/material/styles" {
  interface Palette {
    color200: Palette["primary"];
    color800: Palette["primary"];
  }

  interface PaletteOptions {
    color200?: PaletteOptions["primary"];
    color800?: PaletteOptions["primary"];
  }
}

export interface ITheme {
  customization: ICustomRedux;
  colors: IColors;
  darkTextPrimary: string;
  darkTextSecondary: string;
  textDark: string;
  backgroundDefault: string;
  heading: string;
  paper: string;
  menuSelected: string;
  menuSelectedBack: string;
  divider: string;
}

export interface PaletteOptionsCustom extends PaletteOptions {
  orange: {
    light: string;
    main: string;
    dark: string;
  };
  dark: {
    light: string;
    main: string;
    dark: string;
    color800: string;
    900: string;
  };
}

export default function themePalette(theme: ITheme): PaletteOptionsCustom {
  return {
    mode: theme.customization.navType,
    common: {
      black: theme.colors.darkPaper,
    },
    primary: {
      light: theme.colors.primaryLight,
      main: theme.colors.primaryMain,
      dark: theme.colors.primaryDark,
      200: theme.colors.primary200,
      800: theme.colors.primary800,
    },
    secondary: {
      light: theme.colors.secondaryLight,
      main: theme.colors.secondaryMain,
      dark: theme.colors.secondaryDark,
      200: theme.colors.secondary200,
      800: theme.colors.secondary800,
    },
    error: {
      light: theme.colors.errorLight,
      main: theme.colors.errorMain || "",
      dark: theme.colors.errorDark,
    },
    orange: {
      light: theme.colors.orangeLight || "",
      main: theme.colors.orangeMain || "",
      dark: theme.colors.orangeDark || "",
    },
    warning: {
      light: theme.colors.warningLight,
      main: theme.colors.warningMain || "",
      dark: theme.colors.warningDark,
    },
    success: {
      light: theme.colors.successLight,
      200: theme.colors.success200,
      main: theme.colors.successMain,
      dark: theme.colors.successDark,
    },
    grey: {
      50: theme.colors.grey50,
      100: theme.colors.grey100,
      200: theme.colors.grey200,
      300: theme.colors.grey300,
      500: theme.colors.grey500,
      600: theme.colors.grey600,
      700: theme.colors.grey700,
      900: theme.colors.grey900,
    },
    dark: {
      light: theme.colors.darkTextPrimary || "",
      main: theme.colors.darkLevel1 || "",
      dark: theme.colors.darkLevel2 || "",
      color800: theme.colors.darkBackground || "",
      900: theme.colors.darkPaper || "",
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault,
    },
  };
}
