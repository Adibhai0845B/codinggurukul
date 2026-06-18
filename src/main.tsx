import { createRoot } from "react-dom/client";
import App from "./App";
// @ts-ignore: allow side-effect import of CSS without declarations
import "./index.css";
createRoot(document.getElementById("root")!).render(<App />);