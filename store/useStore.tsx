import {
  BoardTabSectionType,
  CardDetailsTabs,
  FilterStates,
  ListAndCardsAndDueDateAndChecklistType,
} from "@/lib/types";
import { DraggableLocation } from "@hello-pangea/dnd";
import { create } from "zustand";

type StoreType = {
  // INITIALIZE BOARD LIST CARDS DATA
  boardListData: ListAndCardsAndDueDateAndChecklistType[] | null | undefined;
  initialBoardListData: { id: string; cards: number }[] | null | undefined;

  setInitializeBoardListData: (
    data: ListAndCardsAndDueDateAndChecklistType[] | null | undefined,
  ) => void;

  // UPDATE BOARD LIST DATA WITH FILTERS OPTIONS
  setBoardListData: (
    data: ListAndCardsAndDueDateAndChecklistType[] | null | undefined,
  ) => void;

  // OPTIMISTIC UPDATE OF BOARD LIST DATA WITH DRAG AND DROP-----------------------------
  setDndSameListBoardListDataCards: (
    source: DraggableLocation<string>,
    destination: DraggableLocation<string>,
  ) => string;

  setDndBoardListData: (
    source: DraggableLocation<string>,
    destination: DraggableLocation<string>,
  ) => string;

  setDndDifferentListBoardListDataCards: (
    source: DraggableLocation<string>,
    destination: DraggableLocation<string>,
  ) => string;

  // ---------------------------------------------------------------------------------

  // OPEN REMOTE INPUT FROM LIST OPTIONS MENU
  openTitleInput: { id: string; isOpen: boolean };
  setOpenTitleInput: ({ isOpen, id }: { isOpen: boolean; id: string }) => void;

  // OPEN REMOTE NEW CARD INPUT FROM LIST OPTIONS MENU
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

  // CARD DETAILS TABS
  selectedTab: CardDetailsTabs;

  setSelectTab: (value: CardDetailsTabs) => void;

  // CREATE NEW BOARD DIALOG FROM HEADER BUTTON
  newBoardDialogOpen: boolean;
  setNewBoardDialogOpen: (open: boolean) => void;

  //SUBHEADER BOARD HEADER TABS SECTIONS
  boardTabSections: BoardTabSectionType;
  setBoardTabSections: (sections: BoardTabSectionType) => void;

  // SUBHEADER BOARD  FILTERS STATISTICS
  boardSubHeaderFilterSelected: FilterStates;
  setBoardSubHeaderFilterSelected: (selected: FilterStates) => FilterStates;

  boardSubHeaderMemberIdSelected: string | null;
  setBoardSubHeaderMemberIdSelected: (selected: string | null) => string | null;
};

export const useStore = create<StoreType>((set, get) => ({
  // INITIALIZE BOARD LIST CARDS DATA
  boardListData: null,
  initialBoardListData: null,

  setInitializeBoardListData: (data) => {
    set({
      boardListData: data,
      initialBoardListData:
        data?.map((list) => ({ id: list?.id, cards: list?.cards.length })) ||
        null,
    });
  },
  setBoardListData: (data) => {
    set({
      boardListData: data,
    });
  },

  // DRAG AND DROP BOARD LIST CARDS-----------------------------
  setDndSameListBoardListDataCards: (source, destination) => {
    const prevData = get()?.boardListData || [];
    let deletedCardId = "";
    const updatedBoardListData = prevData.map((list) => {
      if (source.droppableId === list.id.toString()) {
        const cardsToDrag = [...list.cards];
        const deletedCard = cardsToDrag.splice(source.index - 1, 1)[0];
        if (!deletedCard) {
          return list;
        }
        cardsToDrag.splice(destination.index - 1, 0, deletedCard);
        deletedCardId = deletedCard?.id.toString() || "";
        return { ...list, cards: cardsToDrag };
      }

      return list;
    });

    set({ boardListData: updatedBoardListData });

    return deletedCardId;
  },
  setDndDifferentListBoardListDataCards: (source, destination) => {
    // CLONED LIST ARRAY LAYER TO AVOID MUTATION
    const newState = [...(get()?.boardListData || [])];

    const sourceListIndex = newState?.findIndex(
      (list) => list?.id.toString() === source.droppableId,
    );
    const destinationListIndex = newState?.findIndex(
      (list) => list?.id.toString() === destination.droppableId,
    );

    if (sourceListIndex === -1 || destinationListIndex === -1) {
      return "";
    }

    // CLONED SOURCE NESTED CARDS AND  LISTS TO AVOID MUTATION
    const sourceList = {
      ...newState[sourceListIndex],
      cards: [...newState[sourceListIndex].cards],
    };

    const [deletedCard] = sourceList.cards.splice(source.index - 1, 1);

    if (!deletedCard) {
      return "";
    }

    // CLONED DESTINATION NESTED CARDS AND LISTS TO AVOID MUTATION
    const destinationList = {
      ...newState[destinationListIndex],
      cards: [...newState[destinationListIndex].cards],
    };

    //add card to new destination
    destinationList.cards.splice(destination.index - 1, 0, deletedCard);

    // ADD NEW CARDS STATE TO NEW STATE AND RETURN IT
    newState[sourceListIndex] = sourceList;
    newState[destinationListIndex] = destinationList;

    set({ boardListData: newState });

    return deletedCard?.id.toString() || "";
  },
  setDndBoardListData: (source, destination) => {
    const prevCopy = [...(get().boardListData || [])];
    const draggedElement = prevCopy?.splice(source.index - 1, 1)[0];

    if (!draggedElement) {
      set({ boardListData: prevCopy });
    }

    prevCopy?.splice(destination.index - 1, 0, draggedElement);

    set({ boardListData: prevCopy });

    return draggedElement?.id.toString() || "";
  },
  // ---------------------------------------------------------

  // OPEN TITLE INPUT REMOTE FROM LIST OPTIONS MENU
  openTitleInput: { id: "", isOpen: false },
  setOpenTitleInput: ({ isOpen, id }: { isOpen: boolean; id: string }) =>
    set({ openTitleInput: { id, isOpen } }),

  // OPEN REMOTE NEW CARD INPUT FROM LIST OPTIONS MENU
  openNewCardInput: { isOpen: false, id: "" },
  setOpenNewCardInput: ({ isOpen, id }: { isOpen: boolean; id: string }) =>
    set({ openNewCardInput: { isOpen, id } }),

  // CARD DETAILS TABS MENU
  selectedTab: "comments",
  setSelectTab: (value) => set({ selectedTab: value }),

  newBoardDialogOpen: false,
  setNewBoardDialogOpen: (open) => set({ newBoardDialogOpen: open }),

  // BOARD HEADER TABS SECTIONS
  boardTabSections: "board",
  setBoardTabSections: (sections) => set({ boardTabSections: sections }),

  // BOARD SUBHEADER FILTERS STATES
  boardSubHeaderFilterSelected: "all",
  setBoardSubHeaderFilterSelected: (selected) => {
    const prevSelectedFilter = get().boardSubHeaderFilterSelected;

    if (prevSelectedFilter === selected) {
      set({ boardSubHeaderFilterSelected: "all" });
      return "theSame";
    }
    set({
      boardSubHeaderFilterSelected: selected,
      boardSubHeaderMemberIdSelected: null,
    });

    return selected;
  },

  boardSubHeaderMemberIdSelected: null,
  setBoardSubHeaderMemberIdSelected: (selected) => {
    const prevSelectedFilter = get().boardSubHeaderMemberIdSelected;

    if (prevSelectedFilter === selected) {
      set({ boardSubHeaderMemberIdSelected: null });
      return null;
    }
    set({
      boardSubHeaderMemberIdSelected: selected,
      boardSubHeaderFilterSelected: "all",
    });

    return selected;
  },
}));
