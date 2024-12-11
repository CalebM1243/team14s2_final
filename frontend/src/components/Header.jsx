import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const Header = ({ setActivePage }) => {
  return (
    <header>
      <div className="collapse text-bg-dark" id="navbarHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-md-7 py-4">
              <h4>About</h4>
              <p className="text-white" style={{ color: "white" }}>
                Welcome to our Recipe Collection! Created by Ryan Heatley and Caleb Moe,
                this website is a showcase of our passion for both technology and cooking.
                Explore our favorite dishes and dive into a culinary experience brought to life through code!
              </p>
            </div>
            <div className="col-sm-4 offset-md-1 py-4">
              <h4>Pages</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to="/home" className="btn btn-link text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/authors" className="btn btn-link text-white">
                    Authors
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="btn btn-link text-white">
                    Your Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <strong>Recipe Collection</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
