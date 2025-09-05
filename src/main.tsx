import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./pages/AppLayout.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<AppLayout />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  </BrowserRouter>
);
