import { useTabsStore } from "@/hooks/useTabsStore";
import { Button } from "@/components/ui/button";
import { IconPlus, IconX } from "@tabler/icons-react";

export default function TabsBar() {
  const tabs = useTabsStore((state) => state.tabs);
  const addTab = useTabsStore((state) => state.addTab);
  const closeTab = useTabsStore((state) => state.closeTab);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);
  const activeTabId = useTabsStore((state) => state.activeTabId);

  return (
    <div className="flex flex-row content-center items-center gap-4 h-25 select-none">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center justify-center w-[160px] h-[50px] pl-4 pr-10 border border-[#314E67] rounded-md cursor-pointer overflow-hidden ${
              isActive ? "bg-[#182B42]" : "bg-[#0F1B2A]"
            }`}
          >
            <span className="text-sm absolute left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {tab.title}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1.5 size-6 cursor-pointer hover:bg-[#314E67] hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <IconX />
            </Button>
          </div>
        );
      })}

      <Button
        variant="secondary"
        size="icon"
        className="bg-[#0F1B2A] hover:bg-[#182B42] size-8 cursor-pointer h-[50px] w-[50px] border border-[#314E67]"
        onClick={() => addTab("dashboard")}
      >
        <IconPlus className="text-white" />
      </Button>
    </div>
  );
}
