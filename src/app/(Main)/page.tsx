import NoProjectSelected from "@/components/NoProjectSelected";
import initialProfile from "@/lib/initialProfile";
import { Users } from "@prisma/client";

const Home = async () => {
  (await initialProfile()) as Users;

  return <NoProjectSelected />;
};

export default Home;
