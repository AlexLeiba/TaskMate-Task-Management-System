"use server";

import { prisma } from "@/lib/prisma";
import { BoardType } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createNewBoardAction(
  boardData: Omit<BoardType, "id">,
): Promise<{ data: boolean; error: { message: string } }> {
  // check if user is auth
  // create new board

  try {
    await prisma.board.create({ data: boardData });

    revalidatePath("/dashboard");
    return { data: true, error: { message: "" } };
  } catch (error) {
    return { data: false, error: { message: "" } };
  }
}
