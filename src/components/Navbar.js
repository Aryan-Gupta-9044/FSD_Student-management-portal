import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">C</span>
        <span>CampusDesk<small>Student records, simplified</small></span>
      </Link>
      <div className="nav-links">
        <NavLink end to="/">Overview</NavLink>
        <NavLink to="/students">Students</NavLink>
      </div>
      <Link className="nav-action" to="/add-student"><span>+</span> Add student</Link>
    </nav>
  );
}

export default Navbar;