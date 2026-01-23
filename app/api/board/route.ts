// app/api/boards/route.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await auth();
  if (!user.userId) {
    return NextResponse.json({ data: [], error: "Unauthorized" });
  }

  try {
    const boards = await prisma.board.findMany();
    return NextResponse.json({ data: boards });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json({ data: [], error: "Something went wrong" });
  }
}
