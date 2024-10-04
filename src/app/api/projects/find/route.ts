import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "User not authenticated or not found" }, { status: 404 });
    }

    const projects = await db.projects.findMany({
      where: {
        userId: profile.userId,
      },
    });

    return NextResponse.json({ message: "Projects Found", projects });
  } catch (err) {
    console.error("[GET Projects Error]", err);

    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
