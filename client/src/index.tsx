import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import App from "./App";
import Router from "./components/hoc/AllRoutes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
