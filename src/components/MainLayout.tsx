import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import CategorySidebar from "./CategorySidebar";
import TopNavMenu from "./TopNavMenu";
const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <>
      <Header onClickSidebar={() => setSidebarOpen(true)} />
      <TopNavMenu />
      <CategorySidebar
        open={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;
