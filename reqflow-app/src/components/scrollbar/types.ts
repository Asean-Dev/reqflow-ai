import type { Theme, SxProps } from "@mui/material/styles";

// ----------------------------------------------------------------------

export type ScrollbarProps = {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  fillContent?: boolean;
  naturalScroll?: boolean;
  slotProps?: {
    wrapper?: SxProps<Theme>;
    contentWrapper?: SxProps<Theme>;
    content?: Partial<SxProps<Theme>>;
  };
};
