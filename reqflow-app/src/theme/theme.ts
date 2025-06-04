import { createTheme, PaletteMode } from "@mui/material";
const mode: PaletteMode = "light";
import "@mui/material/styles";
import { textfield } from "./components/textfield";
import { tooltip } from "./components/tooltip";
declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface TypeBackground {
    neutral?: string;
    lightGrey?: string;
  }
  interface TypographyVariants {
    fontFamilyThai?: string;
  }
  interface TypographyVariantsOptions {
    fontFamilyThai?: string;
  }
}

const theme = createTheme({
  components: {
    ...textfield,
    ...tooltip,
    MuiTextField: { defaultProps: { InputLabelProps: { shrink: true } } },
  },
  palette: {
    mode: mode,
    primary: {
      lighter: "#FFA354",
      light: "#FF9133",
      main: "#FF7500",
      dark: "#E86A00",
      darker: "#B55300",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "##A6B0F2",
      light: "#7989EC",
      main: "#4D62E5",
      dark: "#3045C9",
      darker: "#243497",
      contrastText: "#FFFFFF",
    },
    info: {
      lighter: "#BD9AF8",
      light: "#9C67F4",
      main: "#7C35F1",
      dark: "#5F18D4",
      darker: "#47129F",
      contrastText: "#FFFFFF",
    },
    success: {
      lighter: "#EDFBE6",
      light: "#DBF7CD",
      main: "#B6F09C",
      dark: "#9AD37F",
      darker: "#739F5F",
      contrastText: "#FFFFFF",
    },
    warning: {
      lighter: "#FFF4D5",
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#C77700",
      darker: "#8C5700",
      contrastText: "#1C252E",
    },
    error: {
      lighter: "#FFE3D5",
      light: "#FFC2B2",
      main: "#D0302F",
      dark: "#A62625",
      darker: "#731C1C",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#F5F5F5",
      100: "#E8E9E9",
      200: "#CDCECF",
      300: "#9B9C9E",
      400: "#686B6E",
      500: "#363A3D",
      600: "#1A1D21",
      700: "#131619",
      800: "#0D0F10",
      900: "#060708",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    text: {
      primary: "#1C252E",
      secondary: "#637381",
      disabled: "#C4CDD5",
    },
    background: {
      default: "#FFFFFF",
      lightGrey: "#F9FAFB",
      neutral: "#F4F6F8",
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontFamilyThai: "'Kanit', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: "2.5rem",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: "2rem",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: "1.75rem",
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
    },
    h5: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.25rem",
    },
    h6: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.25rem",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
  },
});

export default theme;
