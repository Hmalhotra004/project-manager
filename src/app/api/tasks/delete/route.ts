import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { Id, projectId } = await req.json();

    if (!Id || !projectId) {
      return NextResponse.json({ error: "Id and projectId are required" }, { status: 400 });
    }

    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const task = await db.tasks.delete({
      where: {
        Id,
        projectId,
      },
    });

    return NextResponse.json({ message: "Task Deleted", task });
  } catch (err) {
    console.error("[tasks][delete]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
