import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "User not authenticated or not found." }, { status: 401 });
    }

    const { description, projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    const project = await db.projects.update({
      where: {
        Id: projectId,
        userId: profile.userId,
      },
      data: {
        description,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found or you do not have permission to update it." }, { status: 404 });
    }

    return NextResponse.json({ message: "Project updated successfully.", project }, { status: 200 });
  } catch (err) {
    console.error("[POST project update error]", err);

    return NextResponse.json({ error: "Failed to update the project description." }, { status: 500 });
  }
}
