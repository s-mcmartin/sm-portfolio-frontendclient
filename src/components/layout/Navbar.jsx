import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/login">Login</Link>
      <Link to="/admin">Admin</Link>
    </div>
  );
};

export default Navbar;
