import React, { useState } from 'react'
import './MyAdmin.jsx'
//import SuperAdminPanel from "../../SuperAdmin/SuperAdminPannel/SuperAdminPanel.jsx";
import EmpTable from '../../Employee/EmployeeTable/EmpTable.jsx';
import AdminProfile from '../AdminProfile/AdminProfile.jsx';
import AdminSidebar from '../AdminSideBar/AdminSidebar.jsx';
function MyAdmin() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <div className='ml-2'>Dashboard Content</div>;
      case 'Admin':
        return < EmpTable />;
      default:
        return <div>Dashboard Content</div>;
    }
  };
  return (
    <div>
      <div className=''><AdminProfile/></div>
      <div className='m-4'>
        <div className='dashboard'>
          <AdminSidebar setActiveMenu={setActiveMenu} />
        </div>
        <div className='d-none d-md-block MainContent'>
          {renderContent()}
        </div>
        <div className='d-block d-md-none MyBlock mt-4'>
          {renderContent()}
        </div>

      </div>
    </div>
  )
}

export default MyAdmin