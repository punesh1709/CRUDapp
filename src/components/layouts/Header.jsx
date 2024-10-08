import React, { useState, useEffect, useRef } from "react";
import "./SuperAdminData.css";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function AdminData() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "",
    role_id: "",
  });
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const storedUserName = localStorage.getItem('userName');
  const storedUserEmail = localStorage.getItem('userEmail');
  const storedUserRole = localStorage.getItem('userRole');
  useEffect(() => {
    // Fetch admin data from the local JSON server
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((employees) => {
        const admin = employees.find(
          (emp) => emp.email === "superadmin@gmail.com"
        );
        if (admin) {
          setAdminData({
            name: admin.name,
            email: admin.email,
            roll: admin.role,
            rollId: admin.role_id, // Corrected access to 'roll id' property
          });
          localStorage.setItem(
            "adminData",
            JSON.stringify({
              name: admin.name,
              email: admin.email,
              roll: admin.role,
              rollId: admin.role_id,
            })
          );
        }
      })
      .catch((error) => console.error("Error fetching admin data:", error));
  }, []);

  // Retrieve stored admin data from local storage
  const storedAdminData = JSON.parse(localStorage.getItem("adminData"));

  const handleProfileClick = (e) => {
    e.preventDefault();
    setShowAdminInfo(!showAdminInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowAdminInfo(false);
    }
  };

  useEffect(() => {
    if (showAdminInfo) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showAdminInfo]);

  return (
    <div>
      <div className="d-flex justify-content-between Mydata">
        <h1 className="text-2xl font-bold hidden md:block ml-10 text-center mt-4 mb-2">
          <svg
            width="136"
            height="22"
            viewBox="0 0 136 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.054 17H43.046L43.42 11.526C43.488 10.608 43.42 9.486 43.42 9.486H43.454C43.454 9.486 43.862 10.761 44.134 11.526L45.409 15.045H47.959L49.234 11.526C49.506 10.761 49.914 9.486 49.914 9.486H49.948C49.948 9.486 49.88 10.608 49.948 11.526L50.322 17H53.297L52.311 4.845H49.081L47.313 9.979C47.041 10.761 46.701 11.985 46.701 11.985H46.667C46.667 11.985 46.327 10.761 46.055 9.979L44.287 4.845H41.057L40.054 17ZM56.2944 17H64.1484V14.45H59.2694V12.155H62.9754V9.605H59.2694V7.395H63.9104V4.845H56.2944V17ZM69.1276 17H72.1026V7.395H75.7916V4.845H65.4386V7.395H69.1276V17ZM77.8008 17H80.7758V12.903H82.1698L84.3288 17H87.6438L85.2808 12.75C84.9918 12.24 84.8218 12.019 84.8218 12.019V11.985C86.0288 11.373 86.6408 9.962 86.6408 8.67C86.6408 6.902 85.7738 5.661 84.3968 5.134C83.8698 4.93 83.2748 4.845 82.0338 4.845H77.8008V17ZM80.7758 10.353V7.395H81.7788C83.2748 7.395 83.6148 7.939 83.6148 8.857C83.6148 9.826 83.0198 10.353 82.0678 10.353H80.7758ZM89.0325 10.846C89.0325 14.416 91.7185 17.204 95.3905 17.204C99.0625 17.204 101.748 14.416 101.748 10.846C101.748 7.361 99.0625 4.641 95.3905 4.641C91.7185 4.641 89.0325 7.361 89.0325 10.846ZM92.1095 10.846C92.1095 8.857 93.5715 7.361 95.3905 7.361C97.2095 7.361 98.6715 8.857 98.6715 10.846C98.6715 12.92 97.2095 14.484 95.3905 14.484C93.5715 14.484 92.1095 12.92 92.1095 10.846ZM104.288 17H107.263V11.339C107.263 10.574 107.127 9.265 107.127 9.265H107.161C107.161 9.265 107.705 10.54 108.181 11.339L111.564 17H114.556V4.845H111.581V10.523C111.581 11.288 111.717 12.597 111.717 12.597H111.683C111.683 12.597 111.139 11.322 110.663 10.523L107.297 4.845H104.288V17ZM117.929 17H120.904V4.845H117.929V17ZM123.434 10.897C123.434 14.501 126.001 17.204 129.809 17.204C132.988 17.204 134.705 15.164 134.705 15.164L133.175 12.988C133.175 12.988 131.781 14.484 129.945 14.484C127.701 14.484 126.511 12.631 126.511 10.829C126.511 9.078 127.616 7.361 129.945 7.361C131.628 7.361 132.988 8.602 132.988 8.602L134.365 6.358C134.365 6.358 132.818 4.641 129.809 4.641C126.154 4.641 123.434 7.361 123.434 10.897Z"
              fill="#252F4A"
            />
            <path
              d="M25.3479 2.07227L30.9247 19.2221C31.345 20.5144 30.3817 21.8406 29.0227 21.8406H25.4501C24.143 21.8406 22.9864 20.9943 22.5908 19.7485L17.313 3.12631C16.8216 1.57872 17.9767 0 19.6004 0H22.4949C23.7943 0 24.946 0.836549 25.3479 2.07227Z"
              fill="#F8285A"
            />
            <path
              d="M18.4585 14.5335L14.4 1.53388C14.1152 0.621383 13.2702 0 12.3143 0C11.3835 0 10.6159 0.729443 10.5685 1.65907L10.0856 11.1365C10.0391 12.0484 10.1491 12.9616 10.4108 13.8364L12.3784 20.4138C12.6317 21.2605 13.4107 21.8406 14.2945 21.8406H15.8075C16.678 21.8406 17.4485 21.2775 17.713 20.4481L18.4476 18.1442C18.8218 16.9703 18.8257 15.7096 18.4585 14.5335Z"
              fill="#E9E9E9"
            />
            <path
              d="M9.14022 0H12.2457C13.864 0 15.0184 1.56893 14.537 3.11397L9.30894 19.8925C8.91832 21.146  1 7.75783 22 6.44476 22H2.91161C1.56815 22 0.606751 20.7018 0.998558 19.4167L6.27064 2.12509C6.65556 0.862609 7.82037 0 9.14022 0Z"
              fill="#F8285A"
            />
          </svg>
        </h1>
        <div className="MyNavs"></div>

        <div
          style={{ position: "relative", display: "inline-block" }}
          className="my-div mb-2 MyNav"
          ref={profileRef}
        >
          <img
            src={
              localStorage.getItem("userRole_id") === "2"
                ? "https://images.pexels.com/photos/1288182/pexels-photo-1288182.jpeg?auto=compress&cs=tinysrgb&w=600"
                : "https://tse4.mm.bing.net/th?id=OIP.1X6Z47Z1amraaATab0wWSAHaHa&pid=Api&P=0&h=220"
            }
            alt="Admin Profile"
            style={{
              width: "45px",
              height: "45px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={handleProfileClick}
            className="rounded-circle border border-success-subtle border-2"
          />

          {showAdminInfo && storedAdminData && (
            <div
              style={{
                position: "absolute",
                top: "65px",
                left: "-110%",
                transform: "translateX(-50%)",
                zIndex: "1",
                background: "#fff",
                padding: "0",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
              className="AdminData menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary p-2"
            >
              <div className="">
                <div className="d-flex ml-2 ">
                  <img
                    src={
                      localStorage.getItem("userRole_id") === "2"
                        ? "https://images.pexels.com/photos/1288182/pexels-photo-1288182.jpeg?auto=compress&cs=tinysrgb&w=600"
                        : "https://tse4.mm.bing.net/th?id=OIP.1X6Z47Z1amraaATab0wWSAHaHa&pid=Api&P=0&h=220"
                    }
                    alt="Admin Profile"
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={handleProfileClick}
                    className="rounded-circle mt-4 mb-4 border border-success-subtle border-2"
                  />
           <div className="MyProfile ml-4 MyAdminsss">
  {localStorage.getItem('userRole_id') === '2' ? (
    <>
      <p className="hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 MyName">
        {storedUserName}
      </p>
      <p className="myEmail">{storedUserEmail}</p>
      <span className="myEmail MyRoll">
      {storedUserRole}
      </span>
    </>
  ) : (
    <>
      <p className="hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 MyName">
        {storedAdminData.name}
      </p>
      <p className="myEmail">{storedAdminData.email}</p>
      <span className="myEmail MyRoll">
        {storedAdminData.roll}
      </span>
    </>
  )}
</div>

                </div>
                <hr className="MyBorder mb-2"></hr>

                <div className="MyAdminss ml-2 mt-0">
                  <li className="flex items-center p-2 py-3 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white Myli ">
                    <CgProfile className="fs-5 MyCon fs-4" />
                    <span>My profile</span>
                  </li>
                  <div
                    type="button"
                    className="border p-2 rounded text-center"
                    onClick={handleLogout}
                  >
                    Log out
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminData;
