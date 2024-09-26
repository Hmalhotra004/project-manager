import ProjectsSidebar from "@/components/ProjectsSidebar";

const Home = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen gap-8">
      <ProjectsSidebar />
      {children}
    </div>
  );
};

export default Home;
