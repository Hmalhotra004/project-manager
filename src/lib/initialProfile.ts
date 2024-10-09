import db from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const initialProfile = async () => {
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
    return profile;
  }

  const newProfile = await db.users.create({
    data: {
      userId: user.id,
      username: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};

export default initialProfile;
