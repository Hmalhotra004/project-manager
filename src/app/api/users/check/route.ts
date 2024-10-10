// src/pages/api/auth/checkUser.ts
import db from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
      },
    });

    return NextResponse.json({ message: "profile made", newProfile });
  } catch (err) {
    console.error("[failed to get user]", err);

    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
