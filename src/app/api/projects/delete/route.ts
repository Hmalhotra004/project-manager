import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const profile = await currentProfile();

    if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const project = await db.projects.delete({
      where: {
        Id: id,
        userId: profile.userId,
      },
    });

    return NextResponse.json({ message: "Project Deleted", project });
  } catch (err) {
    console.log("[projects]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
