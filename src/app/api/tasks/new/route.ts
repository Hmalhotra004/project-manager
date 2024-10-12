import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, projectId } = await req.json();
    const profile = await currentProfile();

    if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const task = await db.tasks.create({
      data: {
        name,
        projectId,
      },
    });

    return NextResponse.json({ message: "Task created successfully", task });
  } catch (err) {
    console.error("[POST Task Error]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
