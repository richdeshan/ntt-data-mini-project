import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/index.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster richColors position="bottom-right" />
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
