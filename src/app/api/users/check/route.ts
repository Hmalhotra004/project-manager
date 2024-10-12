import db from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return RedirectToSignIn;
    }

    const profile = await db.users.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      return NextResponse.json({ message: "profile found", profile });
    }

    const newProfile = await db.users.create({
      data: {
        userId: user.id,
        username: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        password: "asdasdsad",
      },
    });

    return NextResponse.json({ message: "profile made", newProfile });
  } catch (err) {
    console.error("[failed to get user]", err);

    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
