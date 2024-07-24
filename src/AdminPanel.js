// import './fontAwesome';
// import './AdminPanel.css'
// import AdminData from './AdminData';
// import SideBar from './SideBar'
// import './MainContent.css'
// function AdminPanel() {
//   return (
//     <div>

//       <div><AdminData /></div>
//     <div className='m-4 '>

//       <div className='dashboard'>
//         <SideBar />
//       </div>
//       {/* <div className='border  h-100'><MainContent/></div> */}

     
//     </div>
//     {/* <div className='border MainContent'><MainContent/></div> */}
//     <div className='border MainContent'></div>
//     </div>
//   );
// }

// export default AdminPanel;


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
        <div className='MainContent'>
          {renderContent()}
        </div>
        
      </div>
    </div>
  );
}

export default AdminPanel;
