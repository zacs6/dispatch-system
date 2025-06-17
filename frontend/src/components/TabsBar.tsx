import { useTabsStore } from "@/hooks/useTabsStore";
import { Button } from "@/components/ui/button";

export default function TabsBar() {
  const tabs = useTabsStore((state) => state.tabs);
  const addTab = useTabsStore((state) => state.addTab);
  const closeTab = useTabsStore((state) => state.closeTab);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);
  const activeTabId = useTabsStore((state) => state.activeTabId);

  return (
    <div className="flex flex-row self-end gap-12 pl-2">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex flex-row justify-center gap-10 rounded-sm rounded-br-none rounded-bl-none w-40 h-10 text-center ${
            tab.id === activeTabId ? "bg-muted font-semibold" : "bg-accent"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.title}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            X
          </Button>
        </div>
      ))}
      <Button id="newTabBtn" onClick={() => addTab("dashboard")}>
        +
      </Button>
    </div>
  );
}
