import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Adjust the path if needed

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate();

  // Get the updateUsername function from context (if you want to set the username globally)
  const { updateUsername } = useUser();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");

    // Make a POST request to register the user
    try {
      const registerRequest = {
        username,
        password
      };
      
      const response = await fetch("http://localhost:8081/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerRequest),
      });

      const data = await response.json();

      // Log the response from the backend for debugging
      console.log("Register response:", data);

      if (response.ok) {
        // If registration was successful, update global username
        updateUsername(username);
        navigate("/home");
      } else {
        // If registration failed, set the error message
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error registering user:", error);
      setError("An error occurred while registering.");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Recipe Collection</h1>

      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Create a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>} {/* Show error if there's any */}
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
