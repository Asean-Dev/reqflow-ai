import { Box } from "@mui/material";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>{children}</Box>
  );
}
