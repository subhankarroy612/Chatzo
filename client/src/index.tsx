import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import Router from "./components/hoc/AllRoutes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StyledEngineProvider>
);
