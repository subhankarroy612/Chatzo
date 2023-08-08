import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyMessages from "./components/MyMessages";

export default function JoyMessagesTemplate() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <GlobalStyles
        styles={(theme) => ({
          "[data-feather], .feather": {
            color: `var(--Icon-color, ${theme.vars.palette.text.icon})`,
            margin: "var(--Icon-margin)",
            fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize.xl})`,
            width: "1em",
            height: "1em",
          },
        })}
      />
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Box component="main" className="MainContent" flex={1}>
          <MyMessages />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
