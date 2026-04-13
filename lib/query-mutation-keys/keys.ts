export const QUERY_KEYS = {
  pages: {
    dashboard: {
      deleteBoard: "delete-board",
      createNewBoard: {
        create: "create-new-board",
        getImages: "get-images",
      },
    },
    overview: {},
    board: {
      overview: {
        boardOverview: "board-overview",
        finishedWork: "finished-work-overview",
        recentActivities: "recent-activities",
      },
      tableListView: {
        getAllTableData: "get-all-table-data",
        tableSearch: "table-search",
        changePage: "change-page",
      },
      kanbanView: {
        lists: {
          editBoardTitle: "edit-board-title",
          dragAndDrop: {
            reorderList: "reorder-list",
            reorderCard: "reorder-card",
          },
          statuses: {
            updateStatus: "update-list-status",
          },
          editListTitle: "edit-list-title",
          createListCard: "create-list-card",
          deleteList: "delete-list",
          copyList: "copy-list",
        },
        cards: {
          deleteCard: "delete-card",
          copyCard: "copy-card",
          editTitleCard: "edit-title-card",
          editPriority: "edit-priority",
          assignTo: "assign-to-card",
          unassign: "unassign-card",
        },
        cardDetails: {
          getCardDetails: "card-details",
          updateDescription: "update-description",
          getComments: "get-comments",
          createComment: "create-comment",
          deleteComment: "delete-comment",
          uploadFile: "upload-file",
          deleteFile: "delete-file",
          getChecklist: "get-checklist",
          createChecklist: "create-checklist",
          updateChecklist: "update-checklist",
          deleteChecklist: "delete-checklist",
          assignTo: "assign-to-card",
          unassign: "unassign-card",
          editPriority: "edit-priority",
          editStatus: "edit-status",
          createDueDate: "create-due-date",
          deleteDueDate: "delete-due-date",
          deleteCard: "delete-card",
          copyCard: "copy-card",
        },
      },
    },
  },
  hooks: {
    useMembers: "organization-members",
  },
} as const;
