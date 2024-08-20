import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import MainPanel from "./components/layouts/MainPanel";
// import SuperAdminPanel from "./components/layouts/SuperAdminPanel";
//import EmpListing from "./components/Employee/EmpCRUD/EmpListing";
//import SuperAdminPanel from "./components/SuperAdmin/SuperAdminPannel/SuperAdminPanel";
// import MyAdmin from "./components/Admin/AdminPannel/MyAdmin.jsx";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/employees" : "/login"} />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} className=" "/>}
          />
          <Route path="/admin" element={<MainPanel />} />
          {/* <Route
            path="/employees"
            element={isLoggedIn ? <EmpListing /> : <EmpListing />}
          /> */}
          <Route path="/MyAdmin" element={<MainPanel/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
