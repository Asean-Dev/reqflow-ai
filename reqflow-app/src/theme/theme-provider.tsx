"use client";

import { CssBaseline, ThemeProvider as Provider } from "@mui/material";

import React from "react";
import theme from "./theme";

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = (props: Props) => {
  return (
    <Provider theme={theme}>
      <CssBaseline />
      {props.children}
    </Provider>
  );
};

export default ThemeProvider;
