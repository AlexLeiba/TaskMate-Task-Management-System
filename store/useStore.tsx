import { INITIAL_FILTERS_STATE } from "@/lib/consts/protected/board";
import { UNASSIGNED_CARD } from "@/lib/consts/protected/card";
import { Card, List } from "@/lib/generated/prisma/client";
import {
  BoardTabSectionType,
  CardDetailsTabs,
  ListAndCardsAndDueDateAndChecklistType,
  ListDataTableType,
} from "@/lib/types";
import { DraggableLocation } from "@hello-pangea/dnd";
import { create } from "zustand";

type StoreType = {
  // INITIALIZE UNFILTERED BOARD LIST CARDS DATA
  unfilteredBoardListData:
    | (Pick<List, "id"> & { cards: Pick<Card, "id">[] })[]
    | undefined;
  setUnfilteredBoardListData: (
    data: (Pick<List, "id"> & { cards: Pick<Card, "id">[] })[] | undefined,
  ) => void;

  // INITIALIZE BOARD LIST CARDS DATA FOR DND
  boardListData: ListAndCardsAndDueDateAndChecklistType[] | null | undefined;
  setBoardListData: (
    data: ListAndCardsAndDueDateAndChecklistType[] | null | undefined,
  ) => void;

  // ----------------------------------------------------------
  // FILTER STATES
  filterState: Omit<ListDataTableType, "boardId">;
  setFilterState: (state: Omit<ListDataTableType, "boardId">) => void;

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
  newBoardDialogOpen: { header: boolean; dashboard: boolean };
  setNewBoardDialogOpen: (
    dialogState: boolean,
    type?: "dashboard" | "header",
  ) => void;

  //SUBHEADER BOARD HEADER TABS SECTIONS
  boardTabSections: BoardTabSectionType;
  setBoardTabSections: (sections: BoardTabSectionType) => void;
};

export const useStore = create<StoreType>((set, get) => ({
  // INITIALIZE BOARD LIST CARDS DATA
  boardListData: null,
  unfilteredBoardListData: [],

  setUnfilteredBoardListData: (data) => {
    set({
      unfilteredBoardListData: data,
    });
  },
  setBoardListData: (data) => {
    set({
      boardListData: data,
    });
  },

  // ----------------------------------------------------------------
  // FILTER STATE
  filterState: INITIAL_FILTERS_STATE,
  setFilterState: (state) => {
    // MEMBERS
    if (state.filters === "selectedMemberEmail") {
      const prevSelectedMemberEmail = get().filterState.selectedMemberEmail;
      if (
        prevSelectedMemberEmail !== state.selectedMemberEmail &&
        state.selectedMemberEmail !== UNASSIGNED_CARD.email
      ) {
        set({
          filterState: {
            ...INITIAL_FILTERS_STATE,
            selectedMemberEmail: state.selectedMemberEmail,
            filters: "selectedMemberEmail",
          },
        });
        return;
      }
      if (prevSelectedMemberEmail === state.selectedMemberEmail) {
        set({
          filterState: INITIAL_FILTERS_STATE,
        });
        return;
      }
      if (state.selectedMemberEmail === UNASSIGNED_CARD.email) {
        set({
          filterState: {
            ...INITIAL_FILTERS_STATE,
            selectedMemberEmail: UNASSIGNED_CARD.email,
            filters: "unassignedCard",
            unassignedCard: true,
          },
        });
        return;
      }
    }
    // PRIORITY
    if (state.filters === "priority") {
      const prevSelectedPriority = get().filterState.priorityType;
      if (prevSelectedPriority !== state.priorityType && state.priorityType) {
        set({
          filterState: {
            ...INITIAL_FILTERS_STATE,
            priorityType: state.priorityType,
            filters: "priority",
          },
        });
        return;
      }
      if (prevSelectedPriority === state.priorityType) {
        set({
          filterState: INITIAL_FILTERS_STATE,
        });
        return;
      }
    }

    if (state.filters === "search") {
      set({
        filterState: {
          ...INITIAL_FILTERS_STATE,
          search: state.search,
          filters: "search",
        },
      });

      return;
    }

    // OTHER FILTERS

    const prevSelectedFilters = get().filterState.filters;
    if (prevSelectedFilters !== state.filters) {
      set({
        filterState: {
          ...INITIAL_FILTERS_STATE,
          filters: state.filters,
        },
      });
      return;
    }
    if (prevSelectedFilters === state.filters) {
      set({
        filterState: INITIAL_FILTERS_STATE,
      });
      return;
    }

    set({ filterState: state });
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

  newBoardDialogOpen: {
    header: false,
    dashboard: false,
  },
  setNewBoardDialogOpen: (dialogState, type) => {
    const boardDialogState =
      type === "dashboard"
        ? { dashboard: dialogState, header: false }
        : { header: dialogState, dashboard: false };

    set({
      newBoardDialogOpen: boardDialogState,
    });
  },

  // BOARD HEADER TABS SECTIONS
  boardTabSections: "board",
  setBoardTabSections: (sections) => {
    if (sections === "refresh") {
      return;
    }
    set({ boardTabSections: sections });
  },
}));
