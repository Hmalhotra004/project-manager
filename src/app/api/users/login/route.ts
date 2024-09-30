import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await db.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    const response = NextResponse.json({ message: "Login successful", user });

    response.cookies.set("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures cookies are sent over HTTPS in production
      maxAge: 60 * 60, // 1 hour in seconds
      path: "/", // Cookie is accessible across the site
      sameSite: "strict", // Prevents CSRF attacks
    });

    return response;
  } catch (err) {
    console.log("[users]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
