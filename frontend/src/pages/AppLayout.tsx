import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../utils/supabase";

import { AppShell, Group } from "@mantine/core";
import { NavbarSimple } from "@/components/Navbar";
import TabsBar from "@/components/TabsBar";
import UserMenu from "@/components/UserMenu";
import TabRenderer from "./TabRenderer";

export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-muted" />
      </div>
    );
  }

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      aside={{ width: 300, breakpoint: "md", collapsed: { desktop: true, mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <TabsBar />
          <UserMenu />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavbarSimple />
      </AppShell.Navbar>
      <AppShell.Main>
        <TabRenderer />
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Dispatch System</AppShell.Footer>
    </AppShell>
  );
}
