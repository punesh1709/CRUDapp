// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { CgProfile } from 'react-icons/cg';
// function AdminProfile() {
//   const [adminData, setAdminData] = useState({
//     name: "",
//     email: "",
//     roll: "",
//     rollId: ""
//   });

//   const [showAdminInfo, setShowAdminInfo] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const adminEmail = localStorage.getItem('adminEmail');
//     if (adminEmail) {
//       axios.get('http://localhost:8000/admin')
//         .then(response => {
//           const admin = response.data.find(admin => admin.email === adminEmail);
//           setAdminData(admin);
//         })
//         .catch(error => {
//           console.error("There was an error fetching the admin data!", error);
//         });
//     }
//   }, []);
//   const storedAdminData = JSON.parse(localStorage.getItem('adminData'));

//   const handleProfileClick = (e) => {
//     e.preventDefault(); // Prevent default behavior
//     setShowAdminInfo(!showAdminInfo);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     navigate("/login", { replace: true });
//     window.location.reload();
//   };

//   if (!adminData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     // <div>
//     //   <h2>Admin Profile</h2>
//     //   <div className="admin-card">
//     //     <p>Name: {adminData.Name}</p>
//     //     <p>Contact: {adminData.contact}</p>
//     //     <p>Email: {adminData.email}</p>
//     //     <p>Company: {adminData.roll}</p>
//     //   </div>
//     // </div>
//     <div style={{ position: 'relative', display: 'inline-block' }} className='MyMianAdmin'>
//     <img
//       src="https://tse4.mm.bing.net/th?id=OIP.1X6Z47Z1amraaATab0wWSAHaHa&pid=Api&P=0&h=220"
//       alt="Admin Profile"
//       style={{ width: '45px', height: '45px', objectFit: 'cover', cursor: 'pointer' }}
//       onClick={handleProfileClick} className='rounded-circle border border-success-subtle border-2 '
//     />
//     {showAdminInfo && storedAdminData && (
//       <div style={{ position: 'absolute', top: '65px', left: '-110%', transform: 'translateX(-50%)', zIndex: '1', background: '#fff', padding: '0', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }} className='AdminData menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary p-2'>
//         <div className=''>
//           <div className='d-flex'>
//             <img
//               src="https://tse4.mm.bing.net/th?id=OIP.1X6Z47Z1amraaATab0wWSAHaHa&pid=Api&P=0&h=220"
//               alt="Admin Profile"
//               style={{ width: '45px', height: '45px', objectFit: 'cover', cursor: 'pointer' }}
//               onClick={handleProfileClick} className='rounded-circle mt-4  mb-4 border border-success-subtle border-2'
//             />
//             <div className='MyProfile ml-4 MyAdminsss'>
//               <p className=' hover:rounded hover:cursor-pointer 
//   hover:text-white hover:bg-blue-600 MyName'>{adminData.Name}</p>
//               <p className='myEmail'> {adminData.email}</p>
//               <span className='myEmail MyRoll'>admin</span>
//             </div>
//           </div>
//           <hr className='MyBorder mb-2'></hr>


//           <div className='MyAdminss ml-2 mt-0'>
//             <li className='flex items-center p-2 py-3 space-x-4 hover:rounded hover:cursor-pointer 
//   hover:bg-blue-600 hover:text-white Myli '>
//               <CgProfile className='fs-5 MyCon fs-4' />
//               <span className='hidden md:inline '>My profile</span>
//             </li>
//           {/* <hr className='MyBorder'></hr> */}
//           <div type="button" className="border  p-2 rounded text-center" onClick={handleLogout} > Log out</div>
//           </div>


//         </div>
//       </div>
//     )}
//   </div>

//   );
// }

// export default AdminProfile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

function AdminProfile() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    roll: "",
    rollId: "",
    companyName: ""
  });

  const [showAdminInfo, setShowAdminInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail');
    if (adminEmail) {
      axios.get('http://localhost:8000/admin')
        .then(response => {
          const admin = response.data.find(admin => admin.email === adminEmail);
          if (admin) {
            setAdminData(prevData => ({
              ...prevData,
              ...admin
            }));
            // Fetch the company data
            axios.get('http://localhost:8000/company')
              .then(companyResponse => {
                const company = companyResponse.data.find(company => company.companyName === admin.companyName);
                if (company) {
                  // Store the company data in local storage
                  localStorage.setItem('companyData', JSON.stringify(company));
                }
              })
              .catch(error => {
                console.error("There was an error fetching the company data!", error);
              });
          }
        })
        .catch(error => {
          console.error("There was an error fetching the admin data!", error);
        });
    }
  }, []);

  const storedAdminData = JSON.parse(localStorage.getItem('adminData'));
  const storedCompanyData = JSON.parse(localStorage.getItem('companyData'));

  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    setShowAdminInfo(!showAdminInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} className='MyMianAdmin'>
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.1X6Z47Z1amraaATab0wWSAHaHa&pid=Api&P=0&h=220"
        alt="Admin Profile"
        style={{ width: '45px', height: '45px', objectFit: 'cover', cursor: 'pointer' }}
        onClick={handleProfileClick}
        className='rounded-circle border border-success-subtle border-2'
      />
      {showAdminInfo && storedAdminData && (
        <div style={{ position: 'absolute', top: '65px', left: '-110%', transform: 'translateX(-50%)', zIndex: '1', background: '#fff', padding: '0', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }} className='AdminData menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary p-2'>
          <div className=''>
            <div className='d-flex'>
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.1X6Z47Z1amraaATab0wWSAHaHa&pid=Api&P=0&h=220"
                alt="Admin Profile"
                style={{ width: '45px', height: '45px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={handleProfileClick}
                className='rounded-circle mt-4 mb-4 border border-success-subtle border-2'
              />
              <div className='MyProfile ml-4 MyAdminsss'>
              <p className=' hover:rounded hover:cursor-pointer 
//   hover:text-white hover:bg-blue-600 MyName'>{adminData.Name}</p>
                <p className='myEmail'>{adminData.email}</p>
                <span className='myEmail MyRoll'>admin</span>
                {/* <p className='myCompany'>Company: {storedCompanyData ? storedCompanyData.companyName : 'N/A'}</p> */}
              </div>
            </div>
            <hr className='MyBorder mb-2'></hr>

            <div className='MyAdminss ml-2 mt-0'>
              <li className='flex items-center p-2 py-3 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white Myli'>
                <CgProfile className='fs-5 MyCon fs-4' />
                <span className='hidden md:inline'>My profile</span>
              </li>
              <div type="button" className="border p-2 rounded text-center" onClick={handleLogout}>Log out</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
