import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../fontAwesome';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { IoAddOutline } from "react-icons/io5";
import'../../../App.css';

function EmpTable() {
  const [admins, setAdmins] = useState([]);
  const [viewingAdmin, setViewingAdmin] = useState(null);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage, setAdminsPerPage] = useState(10);

  const handleViewShow = (admin) => {
    setViewingAdmin(admin);
    setShow(true);
    setIsViewing(true);
  };

  const handleClose = () => setShow(false);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAdminsPerPageChange = (e) => {
    setAdminsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(data => {
        const adminUsers = data.filter(user => user.role_id === "3");
        setAdmins(adminUsers);
        setFilteredAdmins(adminUsers);
      })
      .catch(error => console.error('Error fetching admins:', error));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, admins]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    setFilteredAdmins(admins.filter(admin =>
      Object.values(admin)
        .some(field => field.toString().toLowerCase().includes(searchValue))
    ));
  };

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  return (
    <div className="table-responsive m-2">
      <div className='MyContent'>
        <h2 className='companies'>Admin Users</h2>
        <div className="d-flex justify-content-between flex-row-reverse mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            style={{ marginTop: "10px", width: "300px" }}
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <table className="table table-bordered">
          <thead className="text-white">
            <tr>
              <th className="bg-black text-white">#</th>
              <th className="bg-black text-white">Name</th>
              <th className="bg-black text-white">Email</th>
              <th className="bg-black text-white">Contact</th>
              <th className="bg-black text-white">Company</th>
              <th className="text-center bg-black text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAdmins.map((admin, index) => (
              <tr key={admin.id}>
                <td>{index + 1 + indexOfFirstAdmin}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.contact  }</td>
                <td>{admin.companyName}</td>
                <td className="d-flex justify-content-evenly">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewShow(admin)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='d-flex justify-content-between MyMianDiv fw-semibold Myflex'>
          <div className='d-flex mb-4 ml-4 '>
            <div className='mt-2 mr-2'>Show:</div>
            <select value={adminsPerPage} onChange={handleAdminsPerPageChange} className="form-select w-auto">
              <option value={5}>5 </option>
              <option value={10}>10 </option>
              <option value={15}>15</option>
            </select>
            <div className='mt-2 ml-2'>per page</div>
          </div>
          <div className="textsName d-flex align-items-center">
            <span>
              {currentPage} of {totalPages}
            </span>
            <div className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <div
                type="button"
                className="btn " onClick={handlePreviousPage}>
                <FontAwesomeIcon icon={["fas", "arrow-left"]} />
              </div>
            </div>
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="btn btn-outline-secondary border-0  MyBTN"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </div>
            ))}
            <div className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <div
                type="button"
                className="btn" onClick={handleNextPage}>
                <FontAwesomeIcon icon={["fas", "arrow-right"]} />
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} className='mt-20'>
          <Modal.Header closeButton>
            <Modal.Title>View Admin Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container row g-3">
              <div className="col-lg-6">
                <h6>Name</h6>
                <p className='border rounded p-2'>{viewingAdmin?.name}</p>
              </div>
              <div className="col-lg-6">
                <h6>Email</h6>
                <p className='border rounded p-2'>{viewingAdmin?.email}</p>
              </div>
              <div className="col-lg-6">
                <h6>Contact</h6>
                <p className='border rounded p-2'>{viewingAdmin?.contact}</p>
              </div>
              <div className="col-lg-6">
                <h6>Company</h6>
                <p className='border rounded p-2'>{viewingAdmin?.companyName}</p>
              </div>
            
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default EmpTable;
