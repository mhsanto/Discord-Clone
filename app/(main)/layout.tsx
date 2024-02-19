import { LeftSidebar } from "@/components/sidebars/left-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="h-full">
        <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
          <LeftSidebar />
        </div>
        <main className="md:pl-[72px] h-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
