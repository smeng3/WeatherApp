import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

// import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
import WeatherApp from "./WeatherApp";

const apiKey = "5a5e004c700e6d1ab956e30611dbedc3";

root.render(
  <StrictMode>
    <WeatherApp apiKey={apiKey} />
  </StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <WeatherApp apiKey={apiKey} />
//   </React.StrictMode>
// );
