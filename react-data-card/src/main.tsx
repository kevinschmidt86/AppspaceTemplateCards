import { createRoot } from "react-dom/client";
import App from "./App";
import { startCard } from "./appspace/card";
import "./styles.css";

startCard();
createRoot(document.getElementById("root")!).render(<App />);
