import { useQuery } from "@apollo/client";
import {
  PaletteType,
  responsiveFontSizes,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import LoadingPage from "./components/common/loading/page";
import Routes from "./routes";
import { BREAKPOINTS, TOAST_OPTIONS } from "./utils/constants";
import { GET_AUTH_USER } from "./utils/queries/user";
import { ThemeModeProvider } from "./utils/themeMode";

const App = () => {
  const { loading } = useQuery(GET_AUTH_USER);
  const [themeMode, setThemeMode] = useState<PaletteType>("light");

  const handleToggleThemeMode = () => {
    setThemeMode((prevThemeMode) =>
      prevThemeMode === "dark" ? "light" : "dark"
    );
  };

  const theme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        primary: red,
        type: themeMode,
      },
      breakpoints: {
        values: BREAKPOINTS,
      },
    })
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {loading ? (
          <LoadingPage />
        ) : (
          <ThemeModeProvider
            value={{ onToggleThemeMode: handleToggleThemeMode, themeMode }}
          >
            <Toaster toastOptions={TOAST_OPTIONS} />
            <Routes />
          </ThemeModeProvider>
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
