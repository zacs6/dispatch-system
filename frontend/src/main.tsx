import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import AppLayout from "./pages/AppLayout.tsx";
import AuthPage from "./pages/AuthPage.tsx";

createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="dark">
    <ModalsProvider>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </ModalsProvider>
  </MantineProvider>
);
