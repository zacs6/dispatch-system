import { useTabsStore } from "@/hooks/useTabsStore";
import type { Tab } from "@/hooks/useTabsStore";

import DashboardTab from "./DashboardTab";
import ReportsTab from "./ReportsTab";
import DepartmentsTab from "./DepartmentsTab";
import SettingsTab from "./SettingsTab";

export default function TabRenderer() {
  const tabs = useTabsStore((state) => state.tabs);
  const activeTabId = useTabsStore((state) => state.activeTabId);

  function renderTabContent(tab: Tab) {
    switch (tab.type) {
      case "dashboard":
        return <DashboardTab key={tab.id} />;
      case "reports":
        return <ReportsTab key={tab.id} />;
      case "departments":
        return <DepartmentsTab key={tab.id} />;
      case "settings":
        return <SettingsTab key={tab.id} />;
      default:
        return null;
    }
  }

  return (
    <div>
      {tabs.map((tab) => (
        <div key={tab.id} style={{ display: tab.id === activeTabId ? "block" : "none" }}>
          {renderTabContent(tab)}
        </div>
      ))}
    </div>
  );
}
