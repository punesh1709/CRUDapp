
import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome';
import './EmpListing.css';
import EmpCreate from './EmpCreate';
import EmpDeatails from "./EmpDeatails"; // Fixed typo in the component name
import EmpEidit from "./EmpEidit";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function EmpTable() {
  const [empdata, setEmpdata] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortPackageOrder, setSortPackageOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const availablePerPageOptions = [5, 10, 15];
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmpId, setEditEmpId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsEmpId, setDetailsEmpId] = useState(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const storedCompanyData = JSON.parse(localStorage.getItem('companyData'));
    if (storedCompanyData) {
      setCompanyName(storedCompanyData.companyName);
    }
    fetchData();
  }, []);

  const fetchData = () => {
    const adminEmail = localStorage.getItem('adminEmail');
  
    fetch("http://localhost:8000/admin")
      .then((res) => res.json())
      .then((admins) => {
        const loggedInAdmin = admins.find(admin => admin.email === adminEmail);
        if (loggedInAdmin) {
          const companyName = loggedInAdmin.companyName;
          setCompanyName(companyName);
  
          fetch("http://localhost:8000/employee")
            .then((res) => res.json())
            .then((employees) => {
              const filteredEmployees = employees.filter(employee => employee.companyName === companyName);
              setEmpdata(filteredEmployees);
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const RemoveFunction = (id) => {
    Swal.fire({
      title: 'Do you want to remove?',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/employee/${id}`, {
          method: 'DELETE',
        })
          .then((res) => {
            Swal.fire('Removed successfully.', '', 'success');
            fetchData();
          })
          .catch((err) => {
            Swal.fire('Error', err.message, 'error');
          });
      
        
      }
    });
  };

  const handleShowDetailsModal = (id) => {
    setDetailsEmpId(id);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => setShowDetailsModal(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setSortPackageOrder(null);
  };

  const handleSortPackage = () => {
    const newOrder = sortPackageOrder === "asc" ? "desc" : "asc";
    setSortPackageOrder(newOrder);
    setSortOrder(null);
  };

  const sortedData = empdata
    ? [...empdata].sort((a, b) => {
      if (sortPackageOrder) {
        const packageA = parseFloat(a.Packege);
        const packageB = parseFloat(b.Packege);
        if (sortPackageOrder === "asc") {
          return packageA - packageB;
        } else {
          return packageB - packageA;
        }
      } else {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      }
    })
    : [];

  const filteredData = sortedData.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.phone.toLowerCase().includes(searchLower) ||
      item.address.toLowerCase().includes(searchLower) ||
      item.Designation.toLowerCase().includes(searchLower) ||
      item.Packege.toString().toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleSaveAndClose = () => {
    handleCloseCreateModal();
    fetchData();
  };

  const handleShowEditModal = (id) => {
    setEditEmpId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleUpdateAndClose = () => {
    handleCloseEditModal();
    fetchData();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="m-4">
      <div className="card-title">
        <h2 className="d-flex justify-content-center fw-bold text-danger">{companyName}</h2>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <div className="d-flex justify-content-between flex-row-reverse">
            <Button variant="success" onClick={handleShowCreateModal}>
              Add New (+)
            </Button>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginTop: "10px", width: "300px" }}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="text-white">
              <tr>
                <th className="bg-black text-white">Serial No.</th>
                <th className="bg-black text-white table-header">
                  Name
                  <button
                    className="btn btn-secondary bg-black border-black sort-button"
                    onClick={handleSort}
                  >
                    {sortOrder === "asc" ? (
                      <FontAwesomeIcon icon="arrow-up" />
                    ) : (
                      <FontAwesomeIcon icon="arrow-down" />
                    )}
                  </button>
                </th>
                <th className="bg-black text-white">Email</th>
                <th className="bg-black text-white">Phone</th>
                <th className="bg-black text-white">Address</th>
                <th className="bg-black text-white">Designation</th>
                <th className="bg-black text-white table-header">
                  Package
                  <button
                    className="btn btn-secondary bg-black border-black sort-button"
                    onClick={handleSortPackage}
                  >
                    {sortPackageOrder === "asc" ? (
                      <FontAwesomeIcon icon="arrow-down" />
                    ) : (
                      <FontAwesomeIcon icon="arrow-up" />
                    )}
                  </button>
                </th>
                <th className="text-center bg-black text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{filteredData.findIndex(emp => emp.id === item.id) + 1}</td>
                  <td>{item.name}</td>
                  <td className="mytd">{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.Designation}</td>
                  <td>{item.Packege}</td>
                  <td className="d-flex justify-content-evenly">
                    <button
                      onClick={() => handleShowEditModal(item.id)}
                      className="btn btn-success"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                    </button>
                    <button
                      onClick={() => RemoveFunction(item.id)}
                      className="btn btn-danger"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-trash" />
                    </button>
                    <button
                      onClick={() => handleShowDetailsModal(item.id)}
                      className="btn btn-primary"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between MyMianDiv">
          <div className="d-flex">
            <div className="mt-2 mr-2">Show:</div>
            <div>
              <select
                className="form-select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                {availablePerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 ml-2">per page</div>
          </div>

          <div className="textsName d-flex align-items-center">
          <span>
              {currentPage} of {totalPages}
            </span>
            <div
              type="button"
              className="btn btn-outline-secondary border-0"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <FaArrowLeft className="textsName" />
            </div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`btn btn-outline-secondary border-0 mx-1 MyBTN ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <div
              type="button"
              className="btn btn-outline-secondary border-0"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight className="textsName" />
            </div>
    
          </div>
        </div>
      </div>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal} className="mt-20">
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmpCreate onClose={handleSaveAndClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal} className="mt-20">
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmpEidit id={editEmpId} onClose={handleUpdateAndClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} className="mt-20">
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmpDeatails id={detailsEmpId} />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmpTable;
