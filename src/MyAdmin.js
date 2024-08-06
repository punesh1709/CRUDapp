import React, { useState } from 'react'
import './MyAdmin.css'
import './fontAwesome';
import EmpTable from './EmpTable';
import AdminSidebar from './AdminSidebar';
import AdminProfile from './AdminProfile';
function MyAdmin() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <div className='ml-2'>Dashboard Content</div>;
      case 'Admin':
        return <EmpTable />;
      default:
        return <div>Dashboard Content</div>;
    }
  };
  return (
    <div>
      <div className=''><AdminProfile /></div>
      <div className='m-4'>
        <div className='dashboard'>
          <AdminSidebar setActiveMenu={setActiveMenu} />
        </div>
        <div className='d-none d-md-block MainContent'>
          {renderContent()}
        </div>
        <div className='d-block d-md-none MyBlock'>
          {/* Content for mobile view can be placed here if different */}
          {renderContent()}
        </div>

      </div>
    </div>
  )
}

export default MyAdmin