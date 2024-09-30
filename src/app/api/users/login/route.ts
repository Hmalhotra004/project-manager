import db from "@/lib/db";
import bcrypt from "bcryptjs";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const secret = "ykjasbfjafijafiuhqiufhf";

export async function POST(req: NextRequest, res: NextApiResponse) {
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

    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

    // Set the cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 60 * 60 * 24 * 30, // 1 month
        sameSite: "strict", // Prevent CSRF attacks
        path: "/", // Cookie is accessible throughout the site
      })
    );

    return NextResponse.json({ message: "Login successful", user });
  } catch (err) {
    console.log("[users]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
