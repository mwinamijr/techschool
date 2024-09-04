import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBars, FaBox, FaShoppingCart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`d-flex flex-column ${
        collapsed ? "collapsed-sidebar" : ""
      } bg-light`}
      style={{
        height: "100vh",
        width: collapsed ? "80px" : "250px",
        transition: "width 0.3s",
      }}
    >
      <div className="p-3">
        <button className="btn btn-light" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link link-dark d-flex align-items-center">
            <FaHome className="me-2" />
            {!collapsed && "Home"}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/dashboard"
            className="nav-link link-dark d-flex align-items-center"
          >
            <MdDashboard className="me-2" />
            {!collapsed && "Dashboard"}
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            to="#"
            className="nav-link dropdown-toggle link-dark d-flex align-items-center"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaBox className="me-2" />
            {!collapsed && "Products"}
          </Link>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link className="dropdown-item" to="/products/action">
                Action
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/products/another-action">
                Another action
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link
            to="/orders"
            className="nav-link link-dark d-flex align-items-center"
          >
            <FaShoppingCart className="me-2" />
            {!collapsed && "Orders"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
