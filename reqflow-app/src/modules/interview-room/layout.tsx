import type { StackProps } from "@mui/material/Stack";

import Stack from "@mui/material/Stack";

// ----------------------------------------------------------------------

type Props = StackProps & {
  slots: {
    input: React.ReactNode;
    main: React.ReactNode;
  };
};

export function Layout({ slots, sx, ...other }: Props) {
  const renderMain = (
    <Stack sx={{ flex: "1 1 auto", minWidth: 0 }}>{slots.main}</Stack>
  );

  const renderInput = (
    <Stack sx={{ minHeight: 0, width: 1, flex: "0 0 auto" }}>
      {slots.input}
    </Stack>
  );

  return (
    <Stack direction="row" sx={sx} {...other}>
      <Stack
        direction="column"
        sx={{ flex: "1 1 auto", minHeight: 0, width: 1, height: 1 }}
      >
        {renderMain}
        {renderInput}
      </Stack>
    </Stack>
  );
}
