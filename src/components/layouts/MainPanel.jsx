import React, { useEffect, useState } from "react";

import "./SuperAdminPanel.css";

import SideBar from "./SideBar";
import "../Company/Company.css";
import Header from "./Header";
import Company from "../Company/Company";
import AdminTable from "../Admin/AdminTable";
import EmpTable from "../Employee/EmpTable";

function AdminPanel() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole_id');
    setUserRole(role);
  }, []);
  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <div>Dashboard Content</div>;
      case "Public Profile":
        return <div>Public Profile Content</div>;
      case "Admin":
        return userRole === "2" ? <EmpTable /> : <AdminTable />;
      case "Company":
        return <Company />;
      case "Settings":
        return <div>Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="m-4">
        <div className="dashboard">
          <SideBar setActiveMenu={setActiveMenu} />
        </div>
        <div className="d-none d-md-block MainContent">{renderContent()}</div>
        <div className="d-block d-md-none">
          {/* Content for mobile view can be placed here if different */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
