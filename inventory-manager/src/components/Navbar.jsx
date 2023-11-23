import "./Navbar.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <Link to="/" className="title">
        Home
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/deleteUser">Delete User</NavLink>
        </li>
        <li>
          <NavLink to="/updatepassword">Update Password</NavLink>
        </li>
        <li>
          <NavLink to="/createorganization">Create Organization</NavLink>
        </li>
        <li>
          <NavLink to="/createrequest">Create Request</NavLink>
        </li>
      </ul>
    </nav>
  );
};
