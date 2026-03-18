export const QUERY_KEYS = {
  pages: {
    boards: {},
    overview: {},
    board: {
      overview: {
        boardOverview: "board-overview",
        finishedWork: "finished-work-overview",
        recentActivities: "recent-activities",
      },
      lists: {},
      cards: {},
    },
  },
  hooks: {
    useMembers: "organization-members",
  },
} as const;
