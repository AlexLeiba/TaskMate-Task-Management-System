"use server";

import { prisma } from "@/lib/prisma";
import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import {
  ActivityWithAuthor,
  FinishedWorkMembersType,
  PriorityBreakdownType,
  StatusOverviewType,
  OverviewStatsType,
  TeamWorkloadType,
} from "@/lib/types";
import { clerkClient } from "@clerk/nextjs/server";

import {} from "@/lib/consts/consts";
import { UNASSIGNED_CARD } from "@/lib/consts/protected/card";
import {
  FINISHED_TASKS_COLORS,
  PRIORITY_BREAKDOWN_COLORS,
  STATUS_OVERVIEW_COLORS,
} from "@/lib/consts/protected/overview";

export async function getOverviewStatsAction(
  currentOrgId: string,
  boardId: string | null,
): Promise<{
  data: OverviewStatsType | null;
  error: { message: string } | null;
}> {
  const { data: activeUser, error } =
    await verifyCurrentActiveUser(currentOrgId);
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
                member?.publicUserData?.firstName +
                  " " +
                  member?.publicUserData?.lastName ||
                member?.publicUserData?.firstName ||
                "Member",
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
      const stats: OverviewStatsType = {
        completed,
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
      const today = new Date();
      const sevenDaysInTheFutureDate = new Date(now.setDate(now.getDate() + 7));
      const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

      boardsData?.forEach((board) =>
        board?.lists.forEach((list) => {
          statusOverview[list?.status] += list.cards.length;

          if (list.status === "done") {
            completed += list.cards.length;
          }

          list.cards?.forEach((card) => {
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
                }
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
                member?.publicUserData?.firstName +
                  " " +
                  member?.publicUserData?.lastName ||
                member?.publicUserData?.firstName ||
                "Member",
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
      const stats: OverviewStatsType = {
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

// TODO
export async function finishedWorkOverviewAction(
  currentOrgId: string,
  boardId: string | null,
  nrOfDaysStats: number = 1000,
): Promise<{ data: FinishedWorkMembersType[] }> {
  const { data: activeUser, error } =
    await verifyCurrentActiveUser(currentOrgId);
  try {
    if (error?.message || !activeUser) {
      throw new Error(error?.message || "User not authorized");
    }

    //FINISHED WORK BY ALL MEMBERS FROM THE CURRENT BOARD

    const finishedWorkData = await prisma.userDoneCardTickets.findMany({
      where: {
        orgId: currentOrgId,
        ...(boardId && { boardId: boardId }), //by board id members will be applied only if this parameter will be provided

        createdAt: {
          gte: new Date(
            new Date().setDate(new Date().getDate() - nrOfDaysStats), //filter by a period of time
          ),
        },
      },
      include: {
        author: true,
      },
    });

    const initialFinishedWorkData: { [key: string]: number } = {};

    const countedFinishedWorkObject = finishedWorkData.reduce((acc, card) => {
      acc[card?.assignedToEmail || ""] =
        (acc[card?.assignedToEmail || ""] || 0) + 1;
      return acc;
    }, initialFinishedWorkData);

    const finishedWorkOfAllMembersData: FinishedWorkMembersType[] = [];

    Object.entries(countedFinishedWorkObject).forEach(([Key, value], index) => {
      const authorData = finishedWorkData.find(
        (card) => card?.assignedToEmail === Key,
      );
      finishedWorkOfAllMembersData.push({
        fullName: authorData?.author?.name || "Member",
        email: Key,
        imageUrl: authorData?.author?.avatar || "",
        value: value,
        fill: FINISHED_TASKS_COLORS[index % FINISHED_TASKS_COLORS.length],
      });
    });

    return { data: finishedWorkOfAllMembersData };
  } catch (error: any) {
    console.log("🚀 ~ finishedWorkOverviewAction ~ error:", error);

    throw error?.message || "Something went wrong";
  }
}

export async function getRecentActivitiesAction(
  currentOrgId: string,
  boardId: string | null,
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
