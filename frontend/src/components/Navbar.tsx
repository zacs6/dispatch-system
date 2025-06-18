import type { ComponentType } from "react";
import { useTabsStore } from "@/hooks/useTabsStore";
import type { Tab } from "@/hooks/useTabsStore";

import { IconLayoutDashboard, IconFileDescription } from "@tabler/icons-react";
import classes from "./Navbar.module.css";

type NavItem = {
  label: string;
  type: Tab["type"];
  icon: ComponentType<{ size?: number; stroke?: number; className?: string }>;
};

const data: NavItem[] = [
  { label: "Dashboard", type: "dashboard", icon: IconLayoutDashboard },
  { label: "Reports", type: "reports", icon: IconFileDescription },
];

export function NavbarSimple() {
  const tabs = useTabsStore((state) => state.tabs);
  const activeTabId = useTabsStore((state) => state.activeTabId);
  const updateCurrentTabType = useTabsStore((state) => state.updateCurrentTabType);
  const updateCurrentTabTitle = useTabsStore((state) => state.updateCurrentTabTitle);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeTabType = activeTab?.type;

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={activeTabType === item.type ? true : undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        updateCurrentTabType(item.type);
        updateCurrentTabTitle(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
