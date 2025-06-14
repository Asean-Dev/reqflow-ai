import { forwardRef } from "react";
// @ts-ignore
import SimpleBar from "simplebar-react";

import Box from "@mui/material/Box";

import type { ScrollbarProps } from "@/components/scrollbar/types";

// ----------------------------------------------------------------------

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ slotProps, children, fillContent, naturalScroll, sx, ...other }, ref) => (
    <Box
      component={SimpleBar}
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={"reqflow__scrollbar__root"}
      sx={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        "& .simplebar-wrapper": slotProps?.wrapper as React.CSSProperties,
        "& .simplebar-content-wrapper":
          slotProps?.contentWrapper as React.CSSProperties,
        "& .simplebar-content": {
          ...(fillContent && {
            minHeight: 1,
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
          }),
          ...slotProps?.content,
        } as React.CSSProperties,
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
);
