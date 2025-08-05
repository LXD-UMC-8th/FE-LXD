import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./context/LanguageProvider.tsx";
import { PendingProvider } from "./context/useLoading.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <PendingProvider>
        <App />
      </PendingProvider>
    </LanguageProvider>
  </StrictMode>,
);
