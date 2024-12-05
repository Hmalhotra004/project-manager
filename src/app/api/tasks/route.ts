import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, projectId } = await req.json();

    const profile = await getCurrentUser();

    if (!profile)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const task = await db.task.create({
      data: {
        name,
        projectId,
      },
    });

    return NextResponse.json(task);
  } catch (err) {
    console.error("[POST Task Error]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const profile = await getCurrentUser();

    if (!profile) {
      return NextResponse.json(
        { error: "User not authenticated or not found" },
        { status: 401 }
      );
    }

    const { id, projectId, state } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const task = await db.task.update({
      where: {
        projectId,
        id,
      },
      data: {
        completed: !state,
      },
    });

    return NextResponse.json(task);
  } catch (err) {
    console.error("[Update Task Error]", err);

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, projectId } = await req.json();

    if (!id || !projectId) {
      return NextResponse.json(
        { error: "Id and projectId are required" },
        { status: 400 }
      );
    }

    const profile = await getCurrentUser();

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const task = await db.task.delete({
      where: {
        id,
        projectId,
      },
    });

    return NextResponse.json(task);
  } catch (err) {
    console.error("[tasks][delete]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
