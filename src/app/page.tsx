"use server";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const curretUser = await getCurrentUser();

  const name = curretUser?.username;
  const email = curretUser?.email;
  const id = curretUser?.id;

  if (!email || !name || !id) {
    redirect("/log-in");
  } else {
    redirect("/projects");
  }
};

export default HomePage;
