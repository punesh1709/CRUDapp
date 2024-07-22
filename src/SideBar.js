
// import React from 'react'
// import { FaTachometerAlt, FaShoppingCart, FaUsers, FaUser, FaBox, FaCog } from 'react-icons/fa';
// import { BsGrid } from "react-icons/bs";
// import { RiAdminLine } from "react-icons/ri";
// import { HiOutlineBuildingOffice } from "react-icons/hi2";
// import { IoSettingsOutline } from "react-icons/io5";
// import { CgProfile } from "react-icons/cg";
// import './SideBar.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// function SideBar() {
//   return (
//     <div className="MySideBar text-gray-900 h-screen fixed w-16 md:w-64 border-r border-gray-500 dark:border-gray-300 MyDivv  ">


// 			<ul className='menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary MyAdminss'>
// 				<li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
//         hover:bg-blue-600 hover:text-white mt-8'>
// 			 <BsGrid className='fs-5 MyCon'/>
// 					<span className='hidden md:inline '>Dashboard</span>
// 				</li>
				
// 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
//         hover:text-white hover:bg-blue-600">
// 					<CgProfile className='fs-5 MyCon'/>
// 					<span className="hidden md:inline ">Public Profile</span>
// 				</li>



// 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
//         hover:text-white hover:bg-blue-600">
// 					<RiAdminLine className='fs-5 MyCon'/>
// 					<span className="hidden md:inline ">Admin</span>
// 				</li>
				
// 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
//         hover:text-white hover:bg-blue-600">
// 					<HiOutlineBuildingOffice className='fs-5 MyCon' />
// 					<span className="hidden md:inline ">Company</span>
// 				</li>
// 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
//         hover:text-white hover:bg-blue-600">
// 					<IoSettingsOutline className='fs-5 MyCon' />
// 					<span className="hidden md:inline ">Settings</span>
// 				</li>
// 			</ul>

// 		</div>
//   )
// }

// export default SideBar


import React from 'react';
import { BsGrid } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import './SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar({ setActiveMenu }) {
  return (
    <div className="MySideBar text-gray-900 h-screen fixed w-16 md:w-64 border-r border-gray-500 dark:border-gray-300 MyDivv">
      <ul className='menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary MyAdminss'>
        <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white mt-8'
            onClick={() => setActiveMenu('Dashboard')}>
          <BsGrid className='fs-5 MyCon'/>
          <span className='hidden md:inline'>Dashboard</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
            onClick={() => setActiveMenu('Public Profile')}>
          <CgProfile className='fs-5 MyCon'/>
          <span className="hidden md:inline">Public Profile</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
            onClick={() => setActiveMenu('Admin')}>
          <RiAdminLine className='fs-5 MyCon'/>
          <span className="hidden md:inline">Admin</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
            onClick={() => setActiveMenu('Company')}>
          <HiOutlineBuildingOffice className='fs-5 MyCon' />
          <span className="hidden md:inline">Company</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
            onClick={() => setActiveMenu('Settings')}>
          <IoSettingsOutline className='fs-5 MyCon' />
          <span className="hidden md:inline">Settings</span>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
