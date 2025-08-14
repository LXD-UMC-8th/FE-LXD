import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./context/LanguageProvider.tsx";
import { PendingProvider } from "./context/useLoading.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <PendingProvider>
        <App />
      </PendingProvider>
      </GoogleOAuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
