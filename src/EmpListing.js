import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome';
import './EmpListing.css';
import EmpCreate from './EmpCreate';
import EmpEidit from './EmpEidit';
import { Modal, Button } from 'react-bootstrap';
import EmpDeatails from "./EmpDeatails";
import Swal from 'sweetalert2';
// import { useNavigate } from "react-router-dom";


function EmpListing() {
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8000/employee")
      .then((res) => res.json())
      .then((resp) => {
        navigate("/employees")
        setEmpdata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
    window.location.reload();
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
      } else if (result.isDismissed) {
        Swal.fire('Employee not removed', '', 'info');
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

  return (
    <div className="container mt-4">
      <div className="card w-100">
        <div className="card-title">
          <h2 className="d-flex justify-content-center fw-bold text-danger">Employee Listing</h2>
          <button onClick={handleLogout} className="btn btn-danger mx-3">Logout</button>
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
          <div class="table-responsive">
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
                    <td>{item.email}</td>
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
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="mb-3 border">
            <span className="border">Show:</span>
            <select
              className="form-select"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {availablePerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal} >
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmpCreate onClose={handleSaveAndClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmpEidit id={editEmpId} onClose={handleUpdateAndClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
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

export default EmpListing;
