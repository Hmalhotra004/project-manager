import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
// import { v4 as uuid4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const saltRounds = 10;
    const hashPwd = await bcrypt.hash(password, saltRounds);

    const user = await db.users.create({
      data: {
        username: name,
        email,
        password: hashPwd,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.log("[users]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
