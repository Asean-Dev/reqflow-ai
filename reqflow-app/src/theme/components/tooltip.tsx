import type { Theme, Components } from "@mui/material/styles";

const MuiTooltip: Components<Theme>["MuiTooltip"] = {
  styleOverrides: {
    tooltip: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.primary.main,
      color: "white",
      borderRadius: "8px",
      padding: "4px 8px",
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: theme.typography.fontFamilyThai,
    }),
  },
};

export const tooltip = {
  MuiTooltip,
};
