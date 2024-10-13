import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "User not authenticated or not found" }, { status: 404 });
    }

    const { Id, projectId, state } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const task = await db.tasks.update({
      where: {
        Id,
        projectId,
      },
      data: {
        completed: state,
      },
    });

    return NextResponse.json({ message: "Task updated", task });
  } catch (err) {
    console.error("[Update Task Error]", err);

    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
