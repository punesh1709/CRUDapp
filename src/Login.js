// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Login({ setIsLoggedIn }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Fetch both employee and admin data
//     Promise.all([
//       fetch("http://localhost:8000/superadmin"),
//       fetch("http://localhost:8000/admin")
//     ])
//     .then(([employeeRes, adminRes]) => {
//       if (!employeeRes.ok || !adminRes.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return Promise.all([employeeRes.json(), adminRes.json()]);
//     })
//     .then(([employees, admins]) => {
//       const user = employees.find((emp) => emp.email === email && emp.password === password);
//       if (user) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem('adminEmail', email); // Store the email of the logged-in admin
//         localStorage.setItem('adminCompanyName', user.companyName); // Store company name
//         setIsLoggedIn(true); // Update isLoggedIn state in parent component
  
//         if (user.email === "superadmin@gmail.com") {
//           navigate("/admin");
//         } else {
//           navigate("/employees");
//         }
//       } else {
//         const admin = admins.find((adm) => adm.email === email && adm.password === password);
//         if (admin) {
//           localStorage.setItem("isLoggedIn", "true");
//           localStorage.setItem('adminEmail', email); // Store the email of the logged-in admin
//           localStorage.setItem('adminCompanyName', admin.companyName); // Store company name
//           setIsLoggedIn(true); // Update isLoggedIn state in parent component
//           navigate("/MyAdmin");
//         } else {
//           setError("Invalid email or password");
//         }
//       }
//     })
//     .catch((err) => {
//       console.error('Error fetching data:', err);
//       setError("Error occurred during login");
//     });
//   };

//   return (
//     <div className="container mt-5 w-25 MyLoginPage">
//       <div className="card">
//         <div className="card-body">
//           <h3 className="card-title text-center">Login</h3>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <div className="input-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 className="btn btn-outline-secondary"
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <div className="d-flex justify-content-evenly">
//             <button className="btn btn-primary" onClick={handleLogin}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Login({ setIsLoggedIn }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Fetch data from the mock API
//     fetch("http://localhost:8000/users")
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(users => {
//         // Find the user in the fetched data
//         const user = users.find(user => user.email === email && user.password === password);
        
//         if (user) {
//           // Store login status and user details in localStorage
//           localStorage.setItem("isLoggedIn", "true");
//           localStorage.setItem('userEmail', email);
//           localStorage.setItem('userCompanyName', user.companyName);

//           setIsLoggedIn(true);

//           // Navigate based on user type
//           switch (user.type) {
//             case "superadmin":
//               navigate("/admin");
//               break;
//             case "admin":
//               navigate("/MyAdmin");
//               break;
//             case "employee":
//               navigate("/employees");
//               break;
//             default:
//               navigate("/login");
//               break;
//           }
//         } else {
//           setError("Invalid email or password");
//         }
//       })
//       .catch(err => {
//         console.error('Error fetching data:', err);
//         setError("Error occurred during login");
//       });
//   };

//   return (
//     <div className="container mt-5 w-25 MyLoginPage">
//       <div className="card">
//         <div className="card-body">
//           <h3 className="card-title text-center">Login</h3>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <div className="input-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 className="btn btn-outline-secondary"
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <div className="d-flex justify-content-evenly">
//             <button className="btn btn-primary" onClick={handleLogin}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


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

          setIsLoggedIn(true);

          // Navigate based on user type
          switch (user.type) {
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
