import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "User not authenticated or not found" }, { status: 404 });
    }

    const { projectId, state } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const project = await db.projects.update({
      where: {
        Id: projectId,
        userId: profile.userId,
      },
      data: {
        completed: state,
      },
    });

    return NextResponse.json({ message: "Project updated", project });
  } catch (err) {
    console.error("[Update Project Error]", err);

    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
