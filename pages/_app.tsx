import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/global.scss";
import "../styles/toast.scss";
import ConfirmProvider from "../components/Confirm/ConfirmProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={1000000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ConfirmProvider>
    </ThemeProvider>
  );
};

export default App;
