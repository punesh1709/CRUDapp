
import React, { useState } from 'react';
import { BsGrid } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import './SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar({ setActiveMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger menu button */}
      <button
        className="hamburger-menu fixed top-4 left-4 md:hidden p-2 rounded-lg bg-gray-800 text-white"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <div className="relative w-6 h-1 bg-white mb-1"></div>
        <div className="relative w-6 h-1 bg-white mb-1"></div>
        <div className="relative w-6 h-1 bg-white"></div>
      </button>

      {/* Backdrop overlay */}
      {isOpen && <div className="backdrop visible" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`MySideBar text-gray-900 h-screen fixed border-r border-gray-500 dark:border-gray-300 MyDivv ${isOpen ? 'w-64' : 'w-16'} md:w-64`}>
        <ul className='menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary MyAdminss MYYul'>
          <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white mt-8'
              onClick={() => setActiveMenu('Dashboard')}>
            <BsGrid className='fs-5 MyCon'/>
            <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'} md:inline`}>Dashboard</span>
          </li>
          <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
              onClick={() => setActiveMenu('Admin')}>
            <RiAdminLine className='fs-5 MyCon'/>
            <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'} md:inline`}>Admin</span>
          </li>
          <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
              onClick={() => setActiveMenu('Company')}>
            <HiOutlineBuildingOffice className='fs-5 MyCon' />
            <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'} md:inline`}>Company</span>
          </li>
          <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
              onClick={() => setActiveMenu('Settings')}>
            <IoSettingsOutline className='fs-5 MyCon' />
            <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'} md:inline`}>Settings</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
