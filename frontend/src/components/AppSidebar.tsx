import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTabsStore } from "@/hooks/useTabsStore";
import type { Tab } from "@/hooks/useTabsStore";

type NavItem = {
  title: string;
  type: Tab["type"];
};

const data: {
  navMain: {
    title: string;
    items: NavItem[];
  }[];
} = {
  navMain: [
    {
      title: "Dispatch",
      items: [
        { title: "Dashboard", type: "dashboard" },
        { title: "Reports", type: "reports" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const tabs = useTabsStore((state) => state.tabs);
  const activeTabId = useTabsStore((state) => state.activeTabId);
  const updateCurrentTabType = useTabsStore((state) => state.updateCurrentTabType);

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={tabs.find((t) => t.id === activeTabId)?.type === item.type}
                    >
                      <a onClick={() => updateCurrentTabType(item.type)}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
