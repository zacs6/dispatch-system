import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../utils/supabase";

import { AppShell, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { NavbarSimple } from "@/components/Navbar";

import TabsBar from "@/components/TabsBar";
import TabRenderer from "./TabRenderer";

export default function AppLayout() {
  const [opened, { toggle }] = useDisclosure();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login");
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
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: "md", collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <TabsBar />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavbarSimple />
      </AppShell.Navbar>
      <AppShell.Main>
        <TabRenderer />
      </AppShell.Main>
      {/* <AppShell.Aside p="md">Aside</AppShell.Aside> */}
      <AppShell.Footer p="md">Dispatch System</AppShell.Footer>
    </AppShell>
  );
}
