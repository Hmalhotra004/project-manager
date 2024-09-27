import ProjectsSidebar from "@/components/ProjectsSidebar";

const Home = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen">
      <ProjectsSidebar />
      <div className="flex mx-auto">{children}</div>
    </div>
  );
};

export default Home;
