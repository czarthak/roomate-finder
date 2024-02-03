import React from "react";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Crumble</h1>
      <p>
        inVT is the Virginia Tech Student Organization Inventory Management System.
        Manage your organization's inventory efficiently with our user-friendly platform.
      </p>
      <h2>Key Features:</h2>
      <ul>
        <li>Create Organizations</li>
        <li>Manage Inventory</li>
      </ul>
      <p>
        Streamline your organization's operations seamlessly.
        Join inVT today for a better inventory management experience!
      </p>
    </div>
  );
};
