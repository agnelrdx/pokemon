/* eslint-disable react-refresh/only-export-components */
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { StateProvider } from "@/lib/state-provider";
import "@/assets/index.css";

const Home = lazy(() => import("@/routes/home"));
const Favorites = lazy(() => import("@/routes/favorites"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Suspense fallback={<div className="text-center p-56">Loading...</div>}>
          <StateProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </StateProvider>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
