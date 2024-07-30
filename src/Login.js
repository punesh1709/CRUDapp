import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Fetch both employee and admin data
    Promise.all([
      fetch("http://localhost:8000/superadmin"),
      fetch("http://localhost:8000/admin")
    ])
    .then(([employeeRes, adminRes]) => {
      if (!employeeRes.ok || !adminRes.ok) {
        throw new Error('Network response was not ok');
      }
      return Promise.all([employeeRes.json(), adminRes.json()]);
    })
    .then(([employees, admins]) => {
      const user = employees.find((emp) => emp.email === email && emp.password === password);
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem('adminEmail', email); // Store the email of the logged-in admin
        localStorage.setItem('adminCompanyName', user.companyName); // Store company name
        setIsLoggedIn(true); // Update isLoggedIn state in parent component
  
        if (user.email === "superadmin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/employees");
        }
      } else {
        const admin = admins.find((adm) => adm.email === email && adm.password === password);
        if (admin) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem('adminEmail', email); // Store the email of the logged-in admin
          localStorage.setItem('adminCompanyName', admin.companyName); // Store company name
          setIsLoggedIn(true); // Update isLoggedIn state in parent component
          navigate("/MyAdmin");
        } else {
          setError("Invalid email or password");
        }
      }
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
      setError("Error occurred during login");
    });
  };
  

  return (
    <div className="container mt-5 w-25">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Login</h3>
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
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
