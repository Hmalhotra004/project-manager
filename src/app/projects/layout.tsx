import Sidebar from "@/components/Sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <section className="h-screen w-screen flex">
      <Sidebar />
      {children}
    </section>
  );
}
