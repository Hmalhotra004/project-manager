import ProjectsSidebar from "@/components/ProjectsSidebar";
import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextResponse } from "next/server";

const Home = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();

  if (!profile) {
    return NextResponse.json({ error: "User not authenticated or not found" }, { status: 404 });
  }

  const projects = await db.projects.findMany({
    where: {
      userId: profile.userId,
    },
  });

  return (
    <div className="flex h-screen w-screen">
      <ProjectsSidebar initialProjects={projects} />
      <div className="flex mx-auto">{children}</div>
    </div>
  );
};

export default Home;
