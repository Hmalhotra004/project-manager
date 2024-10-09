// src/pages/api/auth/checkUser.ts
import { NextApiRequest, NextApiResponse } from "next";
import initialProfile from "@/lib/initialProfile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await initialProfile();
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
