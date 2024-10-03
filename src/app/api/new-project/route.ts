import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, desp, date } = await req.json();
    const profile = await currentProfile();

    if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const project = db.projects.create({
      data: {
        name: title,
        description: desp,
        dueDate: date,
        userId: profile.userId,
      },
    });

    return NextResponse.json({ message: "Login successful", project });
  } catch (err) {
    console.log("[users]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
