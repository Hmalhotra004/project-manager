import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await getCurrentUser();

    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const projects = await db.project.findMany({
      where: {
        userId: profile.id,
      },
      orderBy: [{ name: "asc" }, { completed: "asc" }],
    });

    return NextResponse.json(projects);
  } catch (err) {
    console.error("[GET Projects Error]", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, desp, date } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Info missing" }, { status: 404 });
    }

    const profile = await getCurrentUser();

    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const project = await db.project.create({
      data: {
        name: title,
        description: desp,
        dueDate: new Date(date),
        userId: profile.id,
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error("[projects][POST] An error occurred:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { Id } = await req.json();

    const profile = await getCurrentUser();

    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    if (!Id) {
      return NextResponse.json(
        { error: "Project ID not provided" },
        { status: 400 }
      );
    }

    const project = await db.project.delete({
      where: {
        id: Id,
        userId: profile.id,
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error("[projects/delete] Error deleting project:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
