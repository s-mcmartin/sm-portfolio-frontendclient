import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

//add Navbar and Footer here
const Layout = () => {
  return (
    <section className="flex flex-wrap h-screen">
      <header className="h-fit w-full">
        <Header />
      </header>
      <main className="grow w-full h-full bg-light dark:bg-dark">
        <Outlet />
      </main>
      <footer className="h-fit w-full">
        <Footer />
      </footer>
    </section>
  );
};

export default Layout;
