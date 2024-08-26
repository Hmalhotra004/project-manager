import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectsSidebar from "@/components/ProjectsSidebar";

const Home = () => {
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      <NoProjectSelected />
      {/* <NewProject /> */}
    </main>
  );
};

export default Home;
