import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

//add Navbar and Footer here
const Layout = () => {
  return (
    <section>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default Layout;
