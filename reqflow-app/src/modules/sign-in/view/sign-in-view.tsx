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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultValues, signInSchema } from "../shema";
import { signInAction } from "../actions";
import { getCookie, parseJwt, removeCookie } from "../../../../utils/token";

export function SignInView() {
  const [isSignIn, setIsSignIn] = useState(true);

  console.log("isSignIn", isSignIn);
  const router = useRouter();
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(signInSchema),
  });
  const password = useBoolean(false);

  const handleSubmit = methods.handleSubmit(async (data) => {
    const token = await signInAction(data);

    if (token?.code === 200) setIsSignIn(false);
  });

  useEffect(() => {
    const token = getCookie("token");

    console.log("token", token);
    if (token !== undefined) {
      const payload = parseJwt(token);
      if (payload && payload.exp) {
        const now = Date.now() / 1000;
        if (payload.exp < now) {
          // token หมดอายุ
          removeCookie("token");
          setIsSignIn(true); // หรือ redirect ไป login
        } else {
          setIsSignIn(false);
        }
      } else {
        setIsSignIn(false);
      }
    } else {
      setIsSignIn(true);
    }
  }, []);

  return (
    // <Container>
    <Dialog open={isSignIn} fullWidth sx={{ zIndex: !isSignIn ? -1 : 999 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h1">
            {isSignIn ? "Sign In" : "Sign In Success"}
          </Typography>
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
    // </Container>
  );
}
