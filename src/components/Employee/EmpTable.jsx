import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontAwesome";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { IoAddOutline } from "react-icons/io5";
import "./EmpTable.css";

function EmpTable() {
  const [sortDirection, setSortDirection] = useState("asc");
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [viewingAdmin, setViewingAdmin] = useState(null);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const [Packege, Packegechange] = useState("");
  const [isViewing, setIsViewing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage, setAdminsPerPage] = useState(10);
  const [salary, setSalary] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const handleSort = (key) => {
    const sortedAdmins = [...filteredAdmins].sort((a, b) => {
      if (a[key] < b[key]) return sortDirection === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredAdmins(sortedAdmins);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/users/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            // Remove the deleted admin from the state
            setAdmins(admins.filter((admin) => admin.id !== id));
            setFilteredAdmins(
              filteredAdmins.filter((admin) => admin.id !== id)
            );
            Swal.fire("Deleted!", "The employee has been deleted.", "success");
          })
          .catch((error) => console.error("Error deleting employee:", error));
      }
    });
  };

  // State for add employee modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    Designation: "",
    Packege: `${Packege}LPA`,
    companyName: "",
    password: "12345678",
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
    const errors = {};

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
      const value = e.target.value;
      setEmail(value);

      const emailRegex = /^[^\s@]+@Gmial\.com$/;
      if (value === "" || emailRegex.test(value)) {
        setEmailError("");
      } else {
        setEmailError("Email must end with @Gmial.com");
      }
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

    if (name === "Packege") {
      const value = e.target.value;
      setSalary(value);
      const packageValue = parseInt(value, 10);

      // Check if the value is a number and within the range
      if (value === "" || (value >= 3 && value <= 25)) {
        setInputValue(value);
      } else {
        setInputValue("");
        Swal.fire({
          icon: "error",
          title: "Invalid Input",
          text: "Please enter a number between 3 and 25.",
        });
      }

      // Limit the input to two digits
      if (value.length > 2) {
        return; // Do not update state if more than two digits
      }
    }

    // Update state for the input field if it passes validation
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loggedInAdminCompany = localStorage.getItem("userCompanyName");

    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        // Filter employees whose companyName matches the logged-in admin's companyName
        const filteredEmployees = data.filter(
          (user) =>
            user.role_id === "3" &&
            user.companyName.toLowerCase() ===
              loggedInAdminCompany?.toLowerCase()
        );
        setAdmins(filteredEmployees);
        setFilteredAdmins(filteredEmployees);
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
  const handleEditShow = (admin) => {
    setNewEmployee({
      ...admin, // Populate the form with the existing admin data
    });
    setShowAddModal(true); // Open the modal in edit mode
  };

  const handleAddEmployee = () => {
    const loggedInAdminCompany = localStorage.getItem("userCompanyName");

    const { name, email, contact, address, Designation, Packege, password } =
      newEmployee;

    if (!name || !email || !contact || !address || !Designation || !Packege) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are mandatory. Please fill out all fields.",
      });
      return; // Prevent submission if any field is empty
    }

    // Generate a unique ID if it's a new employee (i.e., no existing ID)
    const uniqueId = newEmployee.id || `emp_${Date.now()}`;

    // Set the company name to the logged-in admin's company name
    const employeeToSave = {
      ...newEmployee,
      id: uniqueId,
      companyName: loggedInAdminCompany,
      Packege: `${Packege}LPA`,
    };

    // Determine if adding or editing based on the presence of an ID
    const method = newEmployee.id ? "PUT" : "POST";
    const url = newEmployee.id
      ? `http://localhost:8000/users/${newEmployee.id}`
      : `http://localhost:8000/users`;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeToSave),
    })
      .then((response) => response.json())
      .then((data) => {
        if (newEmployee.id) {
          // Editing case: Update the existing admin in the state
          setAdmins(
            admins.map((admin) => (admin.id === data.id ? data : admin))
          );
          setFilteredAdmins(
            filteredAdmins.map((admin) => (admin.id === data.id ? data : admin))
          );
        } else {
          // Adding case: Add the new admin to the state
          setAdmins([...admins, data]);
          setFilteredAdmins([...filteredAdmins, data]);
        }
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Employee ${
            newEmployee.id ? "updated" : "added"
          } successfully!`,
        });
      })
      .catch((error) => console.error("Error:", error));
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
              <th className="bg-black text-white">
                Name{" "}
                <Button
                  variant="link"
                  onClick={() => handleSort("name")}
                  className="btn btn-secondary bg-black border-black sort-button"
                >
                  {sortDirection === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up Myicon" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
                  )}
                </Button>
              </th>
              <th className="bg-black text-white">Email</th>
              <th className="bg-black text-white">Contact</th>
              <th className="bg-black text-white">Company</th>
              <th className="bg-black text-white">Address</th>
              <th className="bg-black text-white">Designation</th>
              <th className="bg-black text-white">
                Packege{" "}
                <Button variant="link" onClick={() => handleSort("Packege")}>
                  {sortDirection === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
                  )}
                </Button>
              </th>
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
                    className="btn btn-success"
                    onClick={() => handleEditShow(admin)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(admin.id)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </button>

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
              <div
                type="button"
                className="btn btn-outline-secondary border-0  MyBTN "
                onClick={handlePreviousPage}
              >
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
            <Modal.Title>
              {newEmployee.id ? "Edit Employee" : "Add New Employee"}
            </Modal.Title>
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
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
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
                    type="number"
                    placeholder="Enter package"
                    name="Packege"
                    value={newEmployee.Packege}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleAddEmployee}
                  className="btn btn-success MyempBtn"
                >
                  Add
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default EmpTable;
