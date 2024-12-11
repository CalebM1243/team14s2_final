import React from "react";

const Authors = () => {
  return (
    <div className="container">
      <h2 className="text-center mt-5">Authors</h2>
      <div className="row">
        {/* Left side - Ryan Heatley */}
        <div className="col-md-6 text-center">
          <div className="author-card">
            <h3>Ryan Heatley</h3>
            <p>
              Email:{" "}
              <a href="mailto:ryanheat@iastate.edu">ryanheat@iastate.edu</a>
            </p>
          </div>
        </div>

        {/* Right side - Caleb Moe */}
        <div className="col-md-6 text-center">
          <div className="author-card">
            <h3>Caleb Moe</h3>
            <p>
              Email:{" "}
              <a href="mailto:calebmoe@iastate.edu">calebmoe@iastate.edu</a>
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* Course and Instructor Information */}
      <div className="course-info text-center">
        <h4>Course Information</h4>
        <p>
          <strong>Course Name:</strong> SE/ComS3190 Construction of User
          Interfaces, Spring 2024
        </p>
        <p>
          <strong>Date:</strong> December 11, 2024
        </p>

        <h4>Instructors</h4>
        <p>
          <strong>Dr. Abraham N. Aldaco Gastelum</strong>
        </p>
        <p>
          Email: <a href="mailto:aaldaco@iastate.edu">aaldaco@iastate.edu</a>
        </p>
      </div>
    </div>
  );
};

export default Authors;
