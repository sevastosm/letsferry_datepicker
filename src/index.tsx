import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; // core css
import "./style.css";
import "./flags.css";
import App from "./App";
import PortSelection from "./Search/AutoComplete";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <PortSelection />
    </PrimeReactProvider>
  </React.StrictMode>,
);
