import React from 'react'
import { RiFolderUserLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { PiUserList } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';
function SupADprofile() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    roll: "",
    rollId: ""
  });
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch admin data from the local JSON server
    fetch("http://localhost:8000/employee")
      .then((res) => res.json())
      .then((employees) => {
        const admin = employees.find((emp) => emp.email === "superadmin@gmail.com");
        if (admin) {
          setAdminData({
            name: admin.name,
            email: admin.email,
            roll: admin.roll,
            rollId: admin["roll id"] // Corrected access to 'roll id' property
          });
          // Store admin data in local storage
          localStorage.setItem('adminData', JSON.stringify({
            name: admin.name,
            email: admin.email,
            roll: admin.roll,
            rollId: admin["roll id"]
          }));
        }
      })
      .catch((error) => console.error('Error fetching admin data:', error));
  }, []);

  // Retrieve stored admin data from local storage
  const storedAdminData = JSON.parse(localStorage.getItem('adminData'));

  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    setShowAdminInfo(!showAdminInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
    window.location.reload();
  };
  return (
    <div style={{ position: 'relative', display: 'inline-block' }} className='my-div'>
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.1X6Z47Z1amraaATab0wWSAHaHa&pid=Api&P=0&h=220"
          alt="Admin Profile"
          style={{ width: '45px', height: '45px', objectFit: 'cover', cursor: 'pointer' }}
          onClick={handleProfileClick} className='rounded-circle border border-success-subtle border-2 '
        />
        {showAdminInfo && storedAdminData && (
          <div style={{ position: 'absolute', top: '65px', left: '-170%', transform: 'translateX(-50%)', zIndex: '1', background: '#fff', padding: '0', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }} className='AdminData menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary'>
            <div className=''>
              <div className='d-flex ml-4 '>
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.1X6Z47Z1amraaATab0wWSAHaHa&pid=Api&P=0&h=220"
                  alt="Admin Profile"
                  style={{ width: '45px', height: '45px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={handleProfileClick} className='rounded-circle mt-4  mb-4 border border-success-subtle border-2'
                />
                <div className='MyProfile ml-4 MyAdminsss'>
                  <p className=' hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 MyName'>{storedAdminData.name}</p>
                  <p className='myEmail'>{storedAdminData.email}</p>
                  <span className='myEmail MyRoll'> {storedAdminData.roll}</span>
                </div>
              </div>
              <hr className='MyBorder'></hr>


       <ul className='MyAdminss'>
                <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white Myli'>
                  <RiFolderUserLine className='fs-5 MyCon' />
                  <span >Public Profile</span>
                </li>

                <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white Myli'>
                  <CgProfile className='fs-5 MyCon' />
                  <span className='hidden md:inline '>My profile</span>
                </li>



                
                <li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white Myli'>
                  <HiOutlineUserAdd className='fs-5 MyCon' />
                  <span className='hidden md:inline '>Admin</span>
                </li>

                <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 Myli">
                  <PiUserList className='fs-5 MyCon' />
                  <span className="hidden md:inline "> {storedAdminData.roll}</span>
                </li>
                <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 Myli">
                  <IoSettingsOutline className='fs-5 MyCon' />
                  <span className="hidden md:inline ">{storedAdminData.rollId}</span>
                </li>
              </ul>
                <hr className='MyBorder'></hr>
                <div type="button" className="MyBtn" onClick={handleLogout} > Log out</div>


            </div>
          </div>
        )}
      </div>
  )
}

export default SupADprofile