import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Header from "./components/Header";
import MyMessages from "./components/MyMessages";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";

export const socket = io("http://localhost:8080");

export default function Message() {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = React.useState(
    !!localStorage.getItem("chatzo")
  );
  const [token, setToken] = React.useState(localStorage.getItem("chatzo"));
  const [userDetails, setUserDetails] = React.useState<any>({});
  const userDetailsRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (token) {
      const details: any = jwtDecode(token);
      setUserDetails(details);
      userDetailsRef.current = details;
      socket.emit("user_connected", { ...details });
    }

    return () => {
      socket.emit("user_disconnected", userDetailsRef.current);
    };
  }, [token]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

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
        {/* <Sidebar /> */}
        <Box component="main" className="MainContent" flex={1}>
          <MyMessages />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
