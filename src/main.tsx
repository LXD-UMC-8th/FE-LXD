import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PendingProvider } from "./context/useLoading.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-calendar/dist/Calendar.css";
import { LanguageProvider } from "./context/LanguageProvider.tsx";
import { HomeLanguageProvider } from "./context/HomeLanguageProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <LanguageProvider>
        <HomeLanguageProvider>
          <PendingProvider>
            <App />
          </PendingProvider>
        </HomeLanguageProvider>
      </LanguageProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
