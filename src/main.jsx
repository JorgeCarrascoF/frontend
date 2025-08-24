import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider.jsx";

const queryClient = new QueryClient();

Sentry.init({
  dsn: "https://bc7acf8bf6c9695be588c2c31bfa3a6c@o4509752918540288.ingest.de.sentry.io/4509752919851088",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || "development",
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ["error", "warn", "info"],
    }),
  ],
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

