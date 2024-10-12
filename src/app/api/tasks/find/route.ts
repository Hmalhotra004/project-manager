import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "User not authenticated or not found" }, { status: 404 });
    }

    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "Project ID not provided" }, { status: 400 });
    }

    const tasks = await db.tasks.findMany({
      where: {
        projectId: projectId,
      },
      orderBy: [
        {
          Id: "desc",
        },
      ],
    });

    return NextResponse.json({ message: "Tasks Found", tasks });
  } catch (err) {
    console.error("[POST Tasks Error]", err);

    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
