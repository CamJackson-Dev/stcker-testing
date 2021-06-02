import { PaletteType } from "@material-ui/core";
import React, { createContext, useContext } from "react";

type ContextValue = { onToggleThemeMode: () => void; themeMode: PaletteType };
interface Props {
  value: ContextValue;
}

const ThemeModeContext = createContext<ContextValue | undefined>(undefined);

export const ThemeModeProvider: React.FC<Props> = ({ children, value }) => {
  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeModeContext = () => {
  const context = useContext(ThemeModeContext);
  if (context === undefined)
    throw new Error("Theme Context must be used within");

  return context;
};
