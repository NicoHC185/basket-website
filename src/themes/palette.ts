declare module "@mui/material/styles" {
  interface Palette {
    color800: Palette["primary"];
  }

  interface PaletteOptions {
    color800?: PaletteOptions["primary"];
  }
}

export interface ITheme {
  customization: any;
  colors: any;
  darkTextPrimary: any;
  darkTextSecondary: any;
  textDark: any;
  backgroundDefault: any;
  heading: any;
  paper: any;
  menuSelected: any;
  menuSelectedBack: any;
  divider: any;
}

export default function themePalette(theme: ITheme) {
  return {
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.darkPaper,
    },
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
      color200: theme.colors?.primary200,
      color800: theme.colors?.primary800,
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      color200: theme.colors?.secondary200,
      color800: theme.colors?.secondary800,
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark,
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark,
    },
    success: {
      light: theme.colors?.successLight,
      color200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
    },
    grey: {
      // 50: theme.colors?.grey50,
      // 100: theme.colors?.grey100,
      // 500: theme.darkTextSecondary,
      // 600: theme.heading,
      // 700: theme.darkTextPrimary,
      // 900: theme.textDark,
      50: theme.colors.grey50,
      100: theme.colors.grey100,
      color200: theme.colors.grey200,
      300: theme.colors.grey300,
      500: theme.colors.grey500,
      600: theme.colors.grey600,
      700: theme.colors.grey700,
      900: theme.colors.grey900,
    },
    dark: {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      color800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper,
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100,
    },
    background: {
      paper: theme.paper,
      // default: "#003055",
      default: theme.backgroundDefault,
    },
  };
}
