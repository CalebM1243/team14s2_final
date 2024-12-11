import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Adjust the path to go one level up


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate();

  // Get the updateUsername function from context
  const { updateUsername } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");

    // Make a POST request to login
    try {
      const loginRequest = {
        username,
        password
      }
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      });

      const data = await response.json();

      // Log the response from the backend for debugging
    console.log("Login response:", data);

      if (response.ok) {
        // Update global username after successful login
        updateUsername(username);
        navigate("/home");
      } else {
        // If login failed, set the error message
        setError(data.error || "Login failed");
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error logging in:", error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Recipe Collection</h1>

      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>} {/* Show error if there's any */}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
