import { useTabsStore } from "@/hooks/useTabsStore";
import { CloseButton, ActionIcon, Group, Box } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function TabsBar() {
  const tabs = useTabsStore((state) => state.tabs);
  const addTab = useTabsStore((state) => state.addTab);
  const closeTab = useTabsStore((state) => state.closeTab);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);
  const activeTabId = useTabsStore((state) => state.activeTabId);

  return (
    <Group mt="auto" align="flex-end" gap={24} pl={8}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <Box
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: 160,
              height: 40,
              paddingLeft: 12,
              paddingRight: 8,
              borderRadius: "4px 4px 0 0",
              backgroundColor: isActive ? "#424242" : "#242424",
              borderColor: "#424242",
              borderWidth: "1px 1px 0 1px",
              borderStyle: "solid",
              fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {tab.title}
            </span>

            <CloseButton
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            />
          </Box>
        );
      })}

      <ActionIcon
        variant="filled"
        aria-label="New Tab"
        onClick={() => addTab("dashboard")}
        size="lg"
        style={{ alignSelf: "center" }}
      >
        <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
