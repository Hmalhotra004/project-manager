import db from "@/lib/db"; // Make sure to correctly import your Prisma client
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

//todo:fixme
export default async function currentProfile() {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return NextResponse.redirect("/login");
    }

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string };

    const { userId, email } = decoded;

    if (!userId) {
      return NextResponse.redirect("/login");
    }

    // Find the user in the database
    const user = await db.users.findUnique({
      where: { id: userId },
    });

    // If no user found, redirect to the login page
    if (!user) {
      return NextResponse.redirect("/login");
    }

    // Return the user profile if found
    return NextResponse.json(user);
  } catch (err) {
    console.error("Error fetching current profile:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
