
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Clear localStorage when the component mounts
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogin = () => {
    // Fetch data from the mock API
    fetch("http://localhost:8000/users")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(users => {
        // Find the user in the fetched data
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
          // Store login status and user details in localStorage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userCompanyName', user.companyName);
          localStorage.setItem('userRole', user.role);
          localStorage.setItem('userRole_id', user.role_id);
          localStorage.setItem('userName', user.name || user.Name);



          setIsLoggedIn(true);

          // Navigate based on user type
          switch (user.role) {
            case "superadmin":
              navigate("/admin");
              break;
            case "admin":
              navigate("/MyAdmin");
              break;
            case "employee":
              navigate("/employees");
              break;
            default:
              navigate("/login");
              break;
          }
          
        } else {
          setError("Invalid email or password");
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError("Error occurred during login");
      });
  };

  return (
    <div className="container mt-5 w-25 MyLoginPage">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Login</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="d-flex justify-content-evenly">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;