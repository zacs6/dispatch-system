import { create } from "zustand";

export type Tab = {
  id: number;
  title: string;
  type: "dashboard" | "reports" | "settings";
};

type TabsStore = {
  tabs: Tab[];
  activeTabId: number;
  nextId: number;
  addTab: (tab: Tab["type"]) => void;
  closeTab: (id: number) => void;
  setActiveTab: (id: number) => void;
  updateCurrentTabType: (newType: Tab["type"]) => void;
  updateCurrentTabTitle: (newTitle: string) => void;
};

export const useTabsStore = create<TabsStore>((set) => ({
  tabs: [{ id: 1, title: "Dashboard", type: "dashboard" }],
  activeTabId: 1,
  nextId: 2,
  addTab: (tab) => {
    set((state) => {
      if (state.tabs.length >= 5) return state;

      const newTab = {
        id: state.nextId,
        title: `${tab.charAt(0).toUpperCase() + tab.slice(1)}`,
        type: tab,
      };

      return {
        tabs: [...state.tabs, newTab],
        activeTabId: state.nextId,
        nextId: state.nextId + 1,
      };
    });
  },
  closeTab: (id) => {
    let fallbackId = 0;

    set((state) => {
      if (state.tabs.length <= 1) return state;

      const newTabs = state.tabs.filter((tab) => tab.id !== id);
      if (id === state.activeTabId) {
        const closedTabIndex = state.tabs.findIndex((tab) => tab.id === id);
        const fallbackTab = newTabs[closedTabIndex - 1] || newTabs[0];
        fallbackId = fallbackTab?.id ?? 0;
      }
      return { tabs: newTabs };
    });

    if (fallbackId) {
      set(() => ({ activeTabId: fallbackId }));
    }
  },
  setActiveTab: (id) => {
    set(() => ({ activeTabId: id }));
  },
  updateCurrentTabType: (newType) => {
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === state.activeTabId ? { ...tab, type: newType } : tab
      ),
    }));
  },
  updateCurrentTabTitle: (newTitle) => {
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === state.activeTabId ? { ...tab, title: newTitle } : tab
      ),
    }));
  },
}));
