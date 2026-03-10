"use server";

import { prisma } from "@/lib/prisma";
import { checkCurrentActiveUser } from "@/lib/server/checkCurrentActiveUser";
import {
  ActivityWithAuthor,
  FinishedWorkMembersType,
  PriorityBreakdownType,
  StatusOverviewType,
  SummaryStatsType,
  TeamWorkloadType,
} from "@/lib/types";
import { clerkClient } from "@clerk/nextjs/server";

import {
  FINISHED_TASKS_COLORS,
  PRIORITY_BREAKDOWN_COLORS,
  STATUS_OVERVIEW_COLORS,
  UNASSIGNED_CARD,
} from "@/lib/consts";

export async function getSummaryStatsAction(
  currentOrgId: string,
  boardId: string | null,
): Promise<{
  data: SummaryStatsType | null;
  error: { message: string } | null;
}> {
  const { data: activeUser, error } =
    await checkCurrentActiveUser(currentOrgId);
  try {
    if (error?.message || !activeUser) {
      throw new Error(error?.message || "User not authorized");
    }

    // BOARD SUMMARY
    if (boardId) {
      const boardData = await prisma.board.findFirst({
        where: {
          id: boardId,
          orgId: currentOrgId,
        },
        select: {
          lists: {
            select: {
              id: true,
              status: true,
              cards: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  assignedToEmail: true,
                  priority: true,

                  details: {
                    select: {
                      dueDate: {
                        select: {
                          date: true,
                          time: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      const { data: members } = await (
        await clerkClient()
      )?.organizations?.getOrganizationMembershipList({
        organizationId: currentOrgId,
      });

      let completed = 0;
      // let updatedInAWeek = 0;
      let createdInAWeek = 0;
      let dueDateInAWeek = 0;

      let allAssignedWork = 0;

      let totalTasks = 0;

      const teamWorkload: { [key: string]: number } = {};

      const priorityBreakdown: { [key: string]: number } = {
        low: 0,
        medium: 0,
        high: 0,
        urgent: 0,
      };
      const statusOverview: { [key: string]: number } = {
        todo: 0,
        progress: 0,
        review: 0,
        done: 0,
        backlog: 0,
      };

      // INITIALIZE ALL BOARD MEMBERS
      members.forEach((member) => {
        teamWorkload[member?.publicUserData?.identifier || ""] = 0;
      });

      const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

      const today = new Date();

      boardData?.lists.forEach((list) => {
        statusOverview[list?.status || ""] = list.cards.length;

        if (list.status === "done") {
          completed = list.cards.length;
        }

        list.cards?.forEach((card) => {
          if (list.status !== "done") {
            // count total undone tasks available per board
            totalTasks++;

            // priority breakdown by non finished work
            priorityBreakdown[card?.priority || ""] =
              (priorityBreakdown[card?.priority || ""] || 0) + 1;

            // ASSIGNED TASKS
            if (card.assignedToEmail) {
              // workload except the work already done

              teamWorkload[card?.assignedToEmail || ""] =
                (teamWorkload[card?.assignedToEmail || ""] || 0) + 1;

              // assigned work by non finished work
              allAssignedWork++;
            }
          }

          //   unassigned work by non finished work
          if (!card?.assignedToEmail && list.status !== "done") {
            teamWorkload[UNASSIGNED_CARD.userId || ""] =
              (teamWorkload[UNASSIGNED_CARD.userId || ""] || 0) + 1;
          }

          // DUE DATE in next 7 days
          if (card.details?.dueDate) {
            const dueDate = new Date(card.details.dueDate[0]?.date);
            const timeDiffInSevenDaysInMilliseconds =
              dueDate.getTime() - today.getTime();

            const diffDays = Math.ceil(
              timeDiffInSevenDaysInMilliseconds / oneDayInMilliseconds,
            );
            //check future days only (pozitive nrs)
            if (diffDays >= 0 && diffDays <= 7) {
              dueDateInAWeek++;
            }
          }

          // CREATED in last 7 days
          const createdDate = card.createdAt?.getTime();

          if (createdDate) {
            const timeDiffCreated = Math.abs(today.getTime() - createdDate);
            const diffDaysCreated = Math.ceil(
              timeDiffCreated / oneDayInMilliseconds,
            );

            if (diffDaysCreated <= 7) {
              createdInAWeek++;
            }
          }
        });
      });

      //   TEAM WORKLOAD
      const teamWorkLoadData: TeamWorkloadType[] = [];

      Object.entries(teamWorkload).forEach(([key, value]) => {
        const member = members.find(
          (member) => member?.publicUserData?.identifier === key,
        );
        if (member) {
          if (member?.publicUserData?.identifier === key) {
            teamWorkLoadData.push({
              name:
                member?.publicUserData?.firstName ||
                "" + " " + member?.publicUserData?.lastName ||
                "",
              email: member?.publicUserData?.identifier || "",
              value: value,
              avatar: member?.publicUserData?.imageUrl || "",
            });
            return;
          }
        }
        teamWorkLoadData.push({
          name: key,
          email: key,
          value: value,
          avatar: "",
        });
      });
      //   STATUS OVERVIEW
      const statusOverviewData: StatusOverviewType[] = [];
      Object.entries(statusOverview).forEach(([keyof, value], index) => {
        statusOverviewData.push({
          name: keyof,
          value: value,
          fill: STATUS_OVERVIEW_COLORS[index],
        });
      });

      //   PRIORITY BREAKDOWN
      const priorityBreakdownData: PriorityBreakdownType[] = [];
      Object.entries(priorityBreakdown).forEach(([keyof, value], index) => {
        priorityBreakdownData.push({
          name: keyof,
          value: value,
          fill: PRIORITY_BREAKDOWN_COLORS[index],
        });
      });

      //   STATS
      const stats: SummaryStatsType = {
        completed,
        // updatedInAWeek,
        createdInAWeek,
        dueDateInAWeek,
        teamWorkLoadData,
        priorityBreakdownData,
        statusOverviewData,
        allAssignedWork,
        totalTasks,
      };
      // console.log("🚀 ~ getSummaryData ~ stats=>>>>>>>>>>>:", stats);

      return { data: stats, error: null };
    }

    // ORGANIZATION SUMMARY
    if (currentOrgId && !boardId) {
      // TODO add entire org summary of all boards combined

      const boardsData = await prisma.board.findMany({
        where: {
          orgId: currentOrgId,
        },
        select: {
          lists: {
            select: {
              id: true,
              status: true,
              cards: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  assignedToEmail: true,
                  priority: true,

                  details: {
                    select: {
                      dueDate: {
                        select: {
                          date: true,
                          time: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      const { data: members } = await (
        await clerkClient()
      )?.organizations?.getOrganizationMembershipList({
        organizationId: currentOrgId,
      });

      let completed = 0;
      // let updatedInAWeek = 0;
      let createdInAWeek = 0;
      let dueDateInAWeek = 0;
      let allAssignedWork = 0;
      let totalTasks = 0;

      const teamWorkload: { [key: string]: number } = {};

      const priorityBreakdown: { [key: string]: number } = {
        low: 0,
        medium: 0,
        high: 0,
        urgent: 0,
      };
      const statusOverview: { [key: string]: number } = {
        todo: 0,
        progress: 0,
        review: 0,
        done: 0,
        backlog: 0,
      };
      //   const finishedWorkOverview = [];

      // INITIALIZE ALL ORG MEMBERS WITH UNIQUE EMAILS
      members.forEach((member) => {
        teamWorkload[member?.publicUserData?.identifier || ""] = 0;
      });

      const now = new Date();
      const sevenDaysInTheFutureDate = new Date(now.setDate(now.getDate() + 7));
      const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

      boardsData?.forEach((board) =>
        board?.lists.forEach((list) => {
          statusOverview[list?.status] += list.cards.length;

          if (list.status === "done") {
            completed += list.cards.length;
          }

          list.cards?.forEach((card) => {
            // NON FINISHED WORK
            if (list.status !== "done") {
              totalTasks++;

              // priority breakdown by non finished work
              priorityBreakdown[card?.priority || ""] =
                (priorityBreakdown[card?.priority || ""] || 0) + 1;

              // ASSIGNED TASKS
              if (card.assignedToEmail) {
                teamWorkload[card?.assignedToEmail || ""] =
                  (teamWorkload[card?.assignedToEmail || ""] || 0) + 1;

                // assigned work of non done tasks
                allAssignedWork++;
              }

              //   unassigned
              if (!card?.assignedToEmail) {
                teamWorkload[UNASSIGNED_CARD.userId || ""] =
                  (teamWorkload[UNASSIGNED_CARD.userId || ""] || 0) + 1;
              }
              // DUE DATE in next 7 days
              if (card.details?.dueDate) {
                const dueDate = new Date(card.details.dueDate[0]?.date);
                const timeDiffInSevenDaysInMilliseconds = Math.abs(
                  sevenDaysInTheFutureDate.getTime() - dueDate.getTime(),
                );
                const diffDays = Math.ceil(
                  timeDiffInSevenDaysInMilliseconds / oneDayInMilliseconds,
                );
                if (diffDays <= 7) {
                  dueDateInAWeek++;
                }

                // CREATED in last 7 days
                const createdDate = card.createdAt?.getTime();
                if (createdDate) {
                  const timeDiffCreated = Math.abs(now.getTime() - createdDate);
                  const diffDaysCreated = Math.ceil(
                    timeDiffCreated / oneDayInMilliseconds,
                  );
                  if (diffDaysCreated <= 7) {
                    createdInAWeek++;
                  }
                }

                // UPDATED in last 7 days
                // const updatedCard = card.updatedAt?.getTime();
                // if (updatedCard) {
                //   const timeDiffUpdated = Math.abs(now.getTime() - updatedCard);
                //   const diffDaysUpdated = Math.ceil(
                //     timeDiffUpdated / oneDayInMilliseconds,
                //   );
                //   if (diffDaysUpdated <= 7) {
                //     updatedInAWeek++;
                //   }
                // }
              }
            }
          });
        }),
      );

      //   TEAM WORKLOAD
      const teamWorkLoadData: TeamWorkloadType[] = [];

      Object.entries(teamWorkload).forEach(([key, value]) => {
        const member = members.find(
          (member) => member.publicUserData?.identifier === key,
        );

        if (member) {
          if (member?.publicUserData?.identifier === key) {
            teamWorkLoadData.push({
              name:
                member?.publicUserData?.firstName ||
                "" + " " + member?.publicUserData?.lastName ||
                "",
              email: member?.publicUserData?.identifier || "",
              value: value,
              avatar: member?.publicUserData?.imageUrl || "",
            });
            return;
          }
        }
        teamWorkLoadData.push({
          name: key,
          email: key,
          value: value,
          avatar: "",
        });
      });

      //   STATUS OVERVIEW
      const statusOverviewData: StatusOverviewType[] = [];
      Object.entries(statusOverview).forEach(([keyof, value], index) => {
        statusOverviewData.push({
          name: keyof,
          value: value,
          fill: STATUS_OVERVIEW_COLORS[index],
        });
      });

      //   PRIORITY BREAKDOWN
      const priorityBreakdownData: PriorityBreakdownType[] = [];
      Object.entries(priorityBreakdown).forEach(([keyof, value], index) => {
        priorityBreakdownData.push({
          name: keyof,
          value: value,
          fill: PRIORITY_BREAKDOWN_COLORS[index],
        });
      });

      //   STATS
      const stats: SummaryStatsType = {
        completed,
        // updatedInAWeek,
        createdInAWeek,
        dueDateInAWeek,
        teamWorkLoadData,
        priorityBreakdownData,
        statusOverviewData,
        allAssignedWork,
        totalTasks,
      };

      return { data: stats, error: null };
    }

    // ELSE
    return {
      data: {
        completed: 0,
        // updatedInAWeek: 0,
        createdInAWeek: 0,
        dueDateInAWeek: 0,
        teamWorkLoadData: [],
        statusOverviewData: [],
        priorityBreakdownData: [],
        allAssignedWork: 0,
        totalTasks: 0,
      },
      error: {
        message: "",
      },
    };
  } catch (error: any) {
    console.log("🚀 ~ getSummaryData ~ error:", error);

    return {
      data: null,
      error: {
        message: error?.message || "Something went wrong",
      },
    };
  }
}

export async function finishedWorkOverviewAction(
  currentOrgId: string,
  boardId: string | null,
  nrOfDaysStats: number = 7,
): Promise<{ data: FinishedWorkMembersType[] }> {
  console.log("🚀 ~ finishedWorkOverviewAction ~ boardId:", boardId);
  const { data: activeUser, error } =
    await checkCurrentActiveUser(currentOrgId);
  try {
    if (error?.message || !activeUser) {
      throw new Error(error?.message || "User not authorized");
    }

    //FINISHED WORK BY ALL MEMBERS FROM THE CURRENT BOARD

    const finishedWorkData = await prisma.userDoneCardTickets.findMany({
      where: {
        orgId: currentOrgId,
        ...(boardId && { boardId: boardId }), //will be applied only if thisd will be provided

        createdAt: {
          gte: new Date(
            new Date().setDate(new Date().getDate() - nrOfDaysStats),
          ),
        },
      },
    });

    const { data: members } = await (
      await clerkClient()
    )?.organizations?.getOrganizationMembershipList({
      organizationId: currentOrgId,
    });

    const finishedWorkMembers: { [key: string]: number } = {};

    //   INITIALIZE ALL MEMBERS OF THE CURRENT BOARD
    //   some members with 0 stats will be missing from finishedWorkData
    members.forEach((member) => {
      finishedWorkMembers[member?.publicUserData?.identifier || ""] = 0;
    });

    //   REGISTER DONE WORK BY MEMBERS
    finishedWorkData.forEach((card) => {
      finishedWorkMembers[card?.assignedToEmail || ""]++;
    });

    const finishedWorkMembersData: FinishedWorkMembersType[] = [];

    members.forEach((member, index) => {
      Object.entries(finishedWorkMembers).forEach(([key, value]) => {
        if (key === member?.publicUserData?.identifier) {
          finishedWorkMembersData.push({
            fullName:
              member?.publicUserData?.firstName ||
              "" + " " + member?.publicUserData?.lastName ||
              "",
            email: member?.publicUserData?.identifier || "",
            imageUrl: member?.publicUserData?.imageUrl || "",
            value: value,
            fill: FINISHED_TASKS_COLORS[index % FINISHED_TASKS_COLORS.length],
          });
        }
      });
    });

    return { data: finishedWorkMembersData };
  } catch (error: any) {
    console.log("🚀 ~ finishedWorkOverviewAction ~ error:", error);

    throw error?.message || "Something went wrong";
  }
}

export async function getRecentActivitiesAction(
  currentOrgId: string,
  boardId: string,
): Promise<{ data: ActivityWithAuthor[] }> {
  //MOST RECENT BOARD ACTIVITIES
  if (boardId) {
    const mostRecentActivities = await prisma.activity.findMany({
      where: {
        boardId: boardId,
        orgId: currentOrgId,
      },
      include: { author: true },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: mostRecentActivities };
  }

  // MOST RECENT ORGANIZATION ACTIVITIES
  const mostRecentActivities = await prisma.activity.findMany({
    where: {
      orgId: currentOrgId,
    },
    include: { author: true },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return { data: mostRecentActivities };
}
