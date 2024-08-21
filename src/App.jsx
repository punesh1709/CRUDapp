// import React, { useState } from "react";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Login from "./components/Login/Login";
// import MainPanel from "./components/layouts/MainPanel";
// // import SuperAdminPanel from "./components/layouts/SuperAdminPanel";
// //import EmpListing from "./components/Employee/EmpCRUD/EmpListing";
// //import SuperAdminPanel from "./components/SuperAdmin/SuperAdminPannel/SuperAdminPanel";
// // import MyAdmin from "./components/Admin/AdminPannel/MyAdmin.jsx";
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={<Navigate to={isLoggedIn ? "/employees" : "/login"} />}
//           />
//           <Route
//             path="/login"
//             element={<Login setIsLoggedIn={setIsLoggedIn} className=" "/>}
//           />
//           <Route path="/admin" element={<MainPanel />} />
//           {/* <Route
//             path="/employees"
//             element={isLoggedIn ? <EmpListing /> : <EmpListing />}
//           /> */}
//           <Route path="/MyAdmin" element={<MainPanel/>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Login from "./components/Login/Login";
// import MainPanel from "./components/layouts/MainPanel";
// // import EmpListing from "./components/Employee/EmpCRUD/EmpListing";

// function PrivateRoute({ element: Component, isLoggedIn, ...rest }) {
//   return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
// }

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={<Navigate to={isLoggedIn ? "/employees" : "/login"} />}
//           />

//           {/* Login Route */}
//           <Route
//             path="/login"
//             element={<Login setIsLoggedIn={setIsLoggedIn} />}
//           />

//           {/* Protected Routes */}
//           <Route
//             path="/admin"
//             element={<PrivateRoute isLoggedIn={isLoggedIn} element={MainPanel} />}
//           />
//           <Route
//             path="/MyAdmin"
//             element={<PrivateRoute isLoggedIn={isLoggedIn} element={MainPanel} />}
//           />
//           {/* Add more protected routes as needed */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import MainPanel from "./components/layouts/MainPanel";
// import EmpListing from "./components/Employee/EmpCRUD/EmpListing";

function PrivateRoute({ element: Component, isLoggedIn, ...rest }) {
  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
}

function App() {
  // Initialize isLoggedIn from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Update localStorage whenever isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Redirects to the appropriate route based on login status */}
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/login" : "/login"} />}
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={<PrivateRoute isLoggedIn={isLoggedIn} element={MainPanel} />}
          />
          <Route
            path="/MyAdmin"
            element={<PrivateRoute isLoggedIn={isLoggedIn} element={MainPanel} />}
          />
          {/* Add more protected routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
