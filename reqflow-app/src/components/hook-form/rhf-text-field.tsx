import type { TextFieldProps } from "@mui/material/TextField";

import { Controller, useFormContext } from "react-hook-form";

import TextField from "@mui/material/TextField";
import {
  FormLabel,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useBoolean } from "@/hooks/use-boolean";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  label: string;
};

export function RHFTextField({
  name,
  label,
  helperText,
  type,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormLabel
          sx={{
            color: "text.secondary",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            {label}
          </Typography>
          <TextField
            {...field}
            fullWidth
            type={type}
            value={type === "number" && field.value === 0 ? "" : field.value}
            onChange={(event) => {
              if (type === "number") {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error?.message ?? helperText}
            inputProps={{
              autoComplete: "off",
            }}
            {...other}
          />
        </FormLabel>
      )}
    />
  );
}
