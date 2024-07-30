import React from 'react'
import { BsGrid } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import 'bootstrap/dist/css/bootstrap.min.css';
function AdminSidebar({ setActiveMenu }) {
  return (
    <div className="w-16 md:w-64  MyDivv">
   
      <ul className='menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary MyAdminss'>
        <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white mt-8'
            onClick={() => setActiveMenu('Dashboard')}>
          <BsGrid className='fs-5 MyCon'/>
          <span className='hidden md:inline'>Dashboard</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600"
            onClick={() => setActiveMenu('Admin')}>
          {/* <RiAdminLine className='fs-5 MyCon'/> */}
          <GrUserManager className='fs-5 MyCon' />

          <span className="hidden md:inline">Employee</span>
        </li>
      </ul>
      </div>  
  )
}

export default AdminSidebar