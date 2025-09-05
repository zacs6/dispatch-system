import { useTabsStore } from "@/hooks/useTabsStore";
import type { Tab } from "@/hooks/useTabsStore";

type NavItem = {
  label: string;
  type: Tab["type"];
};

const data: NavItem[] = [
  { label: "Dashboard", type: "dashboard" },
  { label: "Reports", type: "reports" },
  { label: "Departments", type: "departments" },
  { label: "Settings", type: "settings" },
];

export function Navbar() {
  const tabs = useTabsStore((state) => state.tabs);
  const activeTabId = useTabsStore((state) => state.activeTabId);
  const updateCurrentTabType = useTabsStore((state) => state.updateCurrentTabType);
  const updateCurrentTabTitle = useTabsStore((state) => state.updateCurrentTabTitle);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeTabType = activeTab?.type;

  const links = data.map((item) => (
    <a
      className="data-[active]:bg-[#182B42] data-[inactive]:bg-[#0F1B2A] w-[100%] cursor-pointer h-12 border rounded-md border-[#314E67] text-center content-center"
      data-active={activeTabType === item.type ? true : undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        updateCurrentTabType(item.type);
        updateCurrentTabTitle(item.label);
      }}
    >
      {item.label}
    </a>
  ));

  return (
    <nav className="">
      <div className="flex flex-col gap-5 p-6 items-center">{links}</div>
    </nav>
  );
}
