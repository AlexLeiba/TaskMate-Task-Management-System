import { create } from "zustand";

type StoreType = {
  openTitleInput: { id: string; isOpen: boolean };
  setOpenTitleInput: ({ isOpen, id }: { isOpen: boolean; id: string }) => void;

  openNewCardInput: {
    isOpen: boolean;
    id: string;
  };
  setOpenNewCardInput: ({
    isOpen,
    id,
  }: {
    isOpen: boolean;
    id: string;
  }) => void;

  selectedTab: "checklist" | "comments" | "activities" | "attachments";

  setSelectTab: (
    value: "checklist" | "comments" | "activities" | "attachments",
  ) => void;

  newBoardDialogOpen: boolean;
  setNewBoardDialogOpen: (open: boolean) => void;
};
export const useStore = create<StoreType>((set) => ({
  openTitleInput: { id: "", isOpen: false },
  setOpenTitleInput: ({ isOpen, id }: { isOpen: boolean; id: string }) =>
    set({ openTitleInput: { id, isOpen } }),

  openNewCardInput: { isOpen: false, id: "" },
  setOpenNewCardInput: ({ isOpen, id }: { isOpen: boolean; id: string }) =>
    set({ openNewCardInput: { isOpen, id } }),

  selectedTab: "comments",
  setSelectTab: (value) => set({ selectedTab: value }),

  newBoardDialogOpen: false,
  setNewBoardDialogOpen: (open) => set({ newBoardDialogOpen: open }),
}));
