"use client";

import { Container } from "@/components/container/container";
import { RHFFormProvider } from "@/components/hook-form/rhf-form-provider";
import { RHFTextField } from "@/components/hook-form/rhf-text-field";
import { useBoolean } from "@/hooks/use-boolean";
import { Icons } from "@/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { defaultValues, signInSchema } from "../shema";

export function SignInView() {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(signInSchema),
  });
  const password = useBoolean(false);

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container>
      <Dialog open={true} onClose={() => {}}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h1">Sign In</Typography>
            <Tooltip
              title="การลงชื่อเข้าใช้งานเพื่อขอ TOKEN ในการ คุย AI Chatbot เท่านั้น ใช้อะไรก็ได้"
              placement="left"
            >
              <Icons.alert />
            </Tooltip>
          </Stack>
          <Typography variant="h2">Welcome back to the platform</Typography>
          <Typography variant="body1">
            Enter your email and password to sign in
          </Typography>

          <RHFFormProvider methods={methods} onSubmit={handleSubmit}>
            <RHFTextField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              size="medium"
            />
            <RHFTextField
              name="password"
              label="Password"
              placeholder="6+ characters"
              size="medium"
              type={password.value ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      {password.value ? (
                        <Icons.eyeOpen sx={{ color: "text.secondary" }} />
                      ) : (
                        <Icons.eyeClosed sx={{ color: "text.secondary" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </RHFFormProvider>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}
