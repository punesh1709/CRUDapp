import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontAwesome";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { IoAddOutline } from "react-icons/io5";
import "../../../App.css";

function EmpTable() {
  const [admins, setAdmins] = useState([]);
  const [viewingAdmin, setViewingAdmin] = useState(null);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage, setAdminsPerPage] = useState(10);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  

  // State for add employee modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    Designation: "",
    Packege: "",
    companyName: "",
    password: "",
    role: "employee",
    role_id: "3",
  });

  

  const handleViewShow = (admin) => {
    setViewingAdmin(admin);
    setShow(true);
    setIsViewing(true);
  };

  const handleClose = () => {
    setShow(false);
    setShowAddModal(false);
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Name validation: only alphabetic characters and spaces
    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "Name must only contain letters and spaces.",
        }));
        return; // Do not update the state if validation fails
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "",
        }));
      }
    }

    // Email validation: must start with a letter and end with '@gmail.com'
    if (name === "email") {
      const emailStartRegex = /^[A-Za-z]/;
      const emailEndRegex = /@gmail\.com$/;

      // Check if the email starts with a letter
      if (!emailStartRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email must start with a letter.",
        }));
        return; // Do not update the state if validation fails
      }

      // Check if the email ends with '@gmail.com'
      if (value.includes("@")) {
        if (!emailEndRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email must end with '@gmail.com'.",
          }));
          return; // Do not update the state if validation fails
        }
      }

      // Clear email error if valid
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    // Contact validation: Only digits, must be exactly 10 digits
    if (name === "contact") {
      const contactRegex = /^\d{0,10}$/; // Allows up to 10 digits

      if (!contactRegex.test(value)) {
        return; // Do not update state if value is not valid
      }

      // Check if the contact is exactly 10 digits
      if (value.length > 10) {
        return; // Do not update state if more than 10 digits
      }
    }

    // Update state for the input field if it passes validation
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        const adminUsers = data.filter((user) => user.role_id === "3");
        setAdmins(adminUsers);
        setFilteredAdmins(adminUsers);
      })
      .catch((error) => console.error("Error fetching admins:", error));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, admins]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    setFilteredAdmins(
      admins.filter((admin) =>
        Object.values(admin).some((field) =>
          field.toString().toLowerCase().includes(searchValue)
        )
      )
    );
  };

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(
    indexOfFirstAdmin,
    indexOfLastAdmin
  );
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  // Add new employee
  const handleAddEmployee = () => {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        setAdmins([...admins, data]);
        setFilteredAdmins([...filteredAdmins, data]);
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "New employee added successfully!",
        });
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  return (
    <div className="table-responsive m-2">
      <div className="MyContent">
        <h2 className="companies">Admin Users</h2>
        <div className="d-flex justify-content-between flex-row-reverse mb-2">
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            <IoAddOutline />
          </Button>
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
              <th className="bg-black text-white">Address</th>
              <th className="bg-black text-white">Designation</th>
              <th className="bg-black text-white">Packege</th>
              <th className="text-center bg-black text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAdmins.map((admin, index) => (
              <tr key={admin.id}>
                <td>{index + 1 + indexOfFirstAdmin}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.contact}</td>
                <td>{admin.companyName}</td>
                <td>{admin.address}</td>
                <td>{admin.Designation}</td>
                <td>{admin.Packege}</td>
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

        <div className="d-flex justify-content-between MyMianDiv fw-semibold Myflex">
          <div className="d-flex mb-4 ml-4 ">
            <div className="mt-2 mr-2">Show:</div>
            <select
              value={adminsPerPage}
              onChange={handleAdminsPerPageChange}
              className="form-select w-auto"
            >
              <option value={5}>5 </option>
              <option value={10}>10 </option>
              <option value={15}>15</option>
            </select>
            <div className="mt-2 ml-2">per page</div>
          </div>
          <div className="textsName d-flex align-items-center">
            <span>
              {currentPage} of {totalPages}
            </span>
            <div className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <div type="button" className="btn " onClick={handlePreviousPage}>
                <FontAwesomeIcon icon={["fas", "arrow-left"]} />
              </div>
            </div>
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="btn btn-outline-secondary border-0  MyBTN"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </div>
            ))}
            <div
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <div type="button" className="btn" onClick={handleNextPage}>
                <FontAwesomeIcon icon={["fas", "arrow-right"]} />
              </div>
            </div>
          </div>
        </div>

        {/* View Admin Modal */}
        <Modal show={show} onHide={handleClose} className="mt-20">
          <Modal.Header closeButton>
            <Modal.Title>View Admin Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container row g-3">
              <div className="col-lg-6">
                <h6>Name</h6>
                <p className="border rounded p-2">{viewingAdmin?.name}</p>
              </div>
              <div className="col-lg-6">
                <h6>Email</h6>
                <p className="border rounded p-2">{viewingAdmin?.email}</p>
              </div>
              <div className="col-lg-6">
                <h6>Contact</h6>
                <p className="border rounded p-2">{viewingAdmin?.contact}</p>
              </div>
              <div className="col-lg-6">
                <h6>Company</h6>
                <p className="border rounded p-2">
                  {viewingAdmin?.companyName}
                </p>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Add Employee Modal */}
        <Modal show={showAddModal} onHide={handleClose} className="mt-20">
          <Modal.Header closeButton>
            <Modal.Title>Add New Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container row g-3">
              <div className="col-lg-6">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <Form.Text className="text-danger">{errors.name}</Form.Text>
                  )}
                </Form.Group>
              </div>

              <div className="col-lg-6">
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email}
                    </Form.Text>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact"
                    name="contact"
                    value={newEmployee.contact}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>

              <div className="col-lg-6">
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={newEmployee.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              </div>

              <div className="col-lg-6">
              <Form.Group className="mb-3" controlId="formDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter designation"
                  name="Designation"
                  value={newEmployee.Designation}
                  onChange={handleInputChange}
                />
              </Form.Group>
              </div>

              <div className="col-lg-6">
              <Form.Group className="mb-3" controlId="formPackege">
                <Form.Label>Packege</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter package"
                  name="Packege"
                  value={newEmployee.Packege}
                  onChange={handleInputChange}
                />
              </Form.Group>
              </div>

           
              <div className="d-flex justify-content-center">
              <Button type="button"  variant="primary" onClick={handleAddEmployee} className="btn btn-success MyempBtn" >
                Add
              </Button>
              </div>
            </div>{" "}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default EmpTable;
