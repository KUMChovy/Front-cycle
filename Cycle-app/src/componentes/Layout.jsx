import { Outlet } from "react-router-dom";
import Navbar from "./Nav";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-6 pb-24 md:pt-20 md:pb-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;