// import React from 'react'
// import { BsGrid } from "react-icons/bs";
// import { GrUserManager } from "react-icons/gr";
// import 'bootstrap/dist/css/bootstrap.min.css';
// function AdminSidebar({ setActiveMenu }) {
//   return (
//     <div className="w-16 md:w-64  MyDivv">
   
//       <ul className='menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary MyAdminss'>
//         <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white mt-8'
//             onClick={() => setActiveMenu('Dashboard')}>
//           <BsGrid className='fs-5 MyCon'/>
//           <span className='hidden md:inline'>Dashboard</span>
//         </li>
//         <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
//             onClick={() => setActiveMenu('Admin')}>
//           {/* <RiAdminLine className='fs-5 MyCon'/> */}
//           <GrUserManager className='fs-5 MyCon' />

//           <span className="hidden md:inline">Employee</span>
//         </li>
//       </ul>
//       </div>  
//   )
// }

// export default AdminSidebar

// import React, { useState } from 'react';
// import { BsGrid } from "react-icons/bs";
// import { GrUserManager } from "react-icons/gr";
// import './AdminSidebar.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function AdminSidebar({ setActiveMenu }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       {/* Hamburger menu button */}
//       <button
//         className="hamburger-menu fixed top-4 left-4 md:hidden p-2 rounded-lg bg-gray-800 text-white"
//         onClick={toggleSidebar}
//       >
//         <span className="sr-only">Open sidebar</span>
//         <div className="relative w-6 h-1 bg-white mb-1"></div>
//         <div className="relative w-6 h-1 bg-white mb-1"></div>
//         <div className="relative w-6 h-1 bg-white"></div>
//       </button>

//       {/* Sidebar */}
//       <div className={`AdminSideBar text-gray-900 h-screen fixed border-r border-gray-500 dark:border-gray-300 MyDivv ${isOpen ? 'w-64' : 'w-16'} md:w-64`}>
//         <ul className='menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary MyAdminss'>
//           <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white mt-8'
//               onClick={() => setActiveMenu('Dashboard')}>
//             <BsGrid className='fs-5 MyCon'/>
//             <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'} md:inline`}>Dashboard</span>
//           </li>
//           <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
//               onClick={() => setActiveMenu('Admin')}>
//             <GrUserManager className='fs-5 MyCon'/>
//             <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'} md:inline`}>Employee</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default AdminSidebar;


import React, { useState } from 'react';
import { BsGrid } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import './AdminSidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminSidebar({ setActiveMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='MySidebar'>
      {/* Hamburger menu button */}
      <button
        className="hamburger-menu fixed top-5 left-4 md:hidden p-2 rounded-lg bg-gray-800 text-white z-50 myham "
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <div className="relative w-6 h-1 bg-white mb-1"></div>
        <div className="relative w-6 h-1 bg-white mb-1"></div>
        <div className="relative w-6 h-1 bg-white"></div>
      </button>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`AdminSideBar text-gray-900 h-screen fixed border-r border-gray-500 dark:border-gray-300 MyDivv ${isOpen ? 'w-64' : 'w-16'} md:w-64 z-50`}>
        <ul className='menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary MyAdminss MyManu'>
          <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white mt-8'
              onClick={() => setActiveMenu('Dashboard')}>
            <BsGrid className='fs-5 MyCon'/>
            <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'} md:inline`}>Dashboard</span>
          </li>
          <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
              onClick={() => setActiveMenu('Admin')}>
            <GrUserManager className='fs-5 MyCon'/>
            <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'} md:inline`}>Employee</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
