import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderwithNavigate from "./auth/Auth0ProviderwithNavigate";
import { QueryClient, QueryClientProvider } from "react-query";

// please turn it off for development purpose
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderwithNavigate>
          <AppRoutes />
        </Auth0ProviderwithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
