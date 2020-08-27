import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import "../styles/global.scss";
import { theme } from "../styles/theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
