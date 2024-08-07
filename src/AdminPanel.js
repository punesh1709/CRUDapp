import React, { useState } from 'react';
import './fontAwesome';
import './AdminPanel.css';
import AdminData from './AdminData';
import SideBar from './SideBar';
import MainContent from './MainContent';
import './MainContent.css';
import Admin from './Admin';

function AdminPanel() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <div>Dashboard Content</div>;
      case 'Public Profile':
        return <div>Public Profile Content</div>;
      case 'Admin':
        return <Admin/>;
      case 'Company':
        return <MainContent />;
      case 'Settings':
        return <div>Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div>
      <div><AdminData /></div>
      <div className='m-4'>
        <div className='dashboard'>
          <SideBar setActiveMenu={setActiveMenu} />
        </div>
        <div className='d-none d-md-block MainContent'>
          {renderContent()}
        </div>
        <div className='d-block d-md-none'>
          {/* Content for mobile view can be placed here if different */}
          {renderContent()}
        </div>
        
      </div>
    </div>
  );
}

export default AdminPanel;
