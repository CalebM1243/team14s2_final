import React from "react";

const Header = ({ setActivePage }) => {
  return (
    <header>
      <div className="collapse text-bg-dark" id="navbarHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-md-7 py-4">
              <h4>About</h4>
              <p className="text-white" style={{color:"white"}}>
                Welcome to our Recipe Collection! Created by Ryan Heatley and Caleb Moe, 
                this website is a showcase of our passion for both technology and cooking. 
                Explore our favorite dishes and dive into a culinary experience brought to life through code!
              </p>
            </div>
            <div className="col-sm-4 offset-md-1 py-4">
              <h4>Pages</h4>
              <ul className="list-unstyled">
                <li>
                  <button
                    className="btn btn-link text-white"
                    onClick={() => setActivePage("home")}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-link text-white"
                    onClick={() => setActivePage("authors")}
                  >
                    Authors
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-link text-white"
                    onClick={() => setActivePage("profile")}
                  >
                    Your Profile
                  </button>
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
