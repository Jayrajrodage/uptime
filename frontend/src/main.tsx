import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./provider/theme-provider.tsx";
import { BrowserRouter } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlanProvider } from "./provider/plan-provider.tsx";
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PlanProvider>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <App />
            </ThemeProvider>
          </ClerkProvider>
        </QueryClientProvider>
      </PlanProvider>
    </BrowserRouter>
  </StrictMode>
);
