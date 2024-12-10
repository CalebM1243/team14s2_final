import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2024 Recipe Collection. All rights reserved.</p>
            <p>
              Created by <strong>Ryan Heatley</strong> and <strong>Caleb Moe</strong>
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-unstyled d-inline-flex">
              <li className="ms-3">
                <a href="https://github.com/CalebM1243/team14s2_final" className="text-white">
                  <i className="bi bi-github" /> GitHub
                </a>
              </li>
              <li className="ms-3">
                <a href="mailto:calebmoe@iastate.edu" className="text-white">
                  <i className="bi bi-envelope" /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
