// import db from "@/lib/db";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     const user = await db.users.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     return NextResponse.json({ message: "Login successful", user });
//   } catch (err) {
//     console.log("[users]", err);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
