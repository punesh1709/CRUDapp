import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontAwesome";
import "./AdminTable.css";
import { Button, Modal, Form } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
function AdminTable() {
  const [adminData, setAdminData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'view'
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    contact: "",
    email: "",
    companyName: "",
    password: "12345678", // Set password automatically
  });

  const [errors, setErrors] = useState({
    Name: "",
    contact: "",
    email: "",
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const fetchAdminData = () => {
      axios
        .get("http://localhost:8000/users")
        .then((response) => {
          // Filter out only the users with the role 'admin'
          const adminData = response.data.filter(
            (user) => user.role === "admin"
          );
          setAdminData(adminData);
          setFilteredData(adminData); // Assuming filteredData is for admins
        })
        .catch((error) => {
          console.error("There was an error fetching the admin data!", error);
        });
    };

    const fetchCompanyData = () => {
      axios
        .get("http://localhost:8000/company")
        .then((response) => {
          setCompanyData(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the company data!", error);
        });
    };

    // Fetch admin and company data on component mount
    fetchAdminData();
    fetchCompanyData();
  }, []);

  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();

    const results = adminData.filter((admin) =>
      Object.values(admin).some((value) =>
        value.toString().toLowerCase().includes(searchLower)
      )
    );

    setFilteredData(results);
  }, [searchQuery, adminData]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you want to remove this admin?",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/users/${id}`)
          .then(() => {
            Swal.fire("Removed successfully.", "", "success");
            const updatedData = adminData.filter((admin) => admin.id !== id);
            setAdminData(updatedData);
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  const handleAddOrUpdateAdmin = () => {
    const { Name, contact, email, companyName, password } = formData;

    // Validation checks
    let isValid = true;
    const newErrors = { Name: "", contact: "", email: "" };

    if (!/^[a-zA-Z\s]+$/.test(Name)) {
      isValid = false;
      newErrors.Name = "Name must contain only letters and spaces.";
    }

    if (!/^\d{10}$/.test(contact)) {
      isValid = false;
      newErrors.contact = "Contact must be exactly 10 digits.";
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      isValid = false;
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);

    if (!isValid) return;

    const adminPayload = {
      Name,
      contact,
      email,
      companyName,
      password,
      role: "admin", // Default role
      role_id: "2", // Default role_id
    };

    if (modalMode === "edit") {
      axios
        .put(`http://localhost:8000/users/${currentAdmin.id}`, adminPayload)
        .then(() => {
          // Refetch admin data after updating
          axios
            .get("http://localhost:8000/users")
            .then((response) => {
              const adminData = response.data.filter(
                (user) => user.role === "admin"
              );
              setAdminData(adminData);
              setFilteredData(adminData);
              setShowModal(false);
              Swal.fire("Success", "Admin updated successfully.", "success");
            })
            .catch((error) => {
              Swal.fire("Error", error.message, "error");
            });
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    } else if (modalMode === "add") {
      // Check for existing admin with the same companyName
      const existingAdmin = adminData.find(
        (admin) => admin.companyName === companyName
      );

      if (existingAdmin) {
        Swal.fire("Error", "This company already has an admin.", "error");
        return;
      }

      axios
        .post("http://localhost:8000/users", adminPayload)
        .then(() => {
          // Refetch admin data after adding new admin
          axios
            .get("http://localhost:8000/users")
            .then((response) => {
              const adminData = response.data.filter(
                (user) => user.role === "admin"
              );
              setAdminData(adminData);
              setFilteredData(adminData);
              setShowModal(false);
              Swal.fire("Success", "Admin added successfully.", "success");
            })
            .catch((error) => {
              Swal.fire("Error", error.message, "error");
            });
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Name") {
      // Allow only letters and spaces
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "contact") {
      // Allow only digits and ensure exact 10 digits
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEdit = (admin) => {
    setFormData({
      Name: admin.Name,
      contact: admin.contact,
      email: admin.email,
      companyName: admin.companyName,
      password: "12345678", // Automatically set password
    });
    setCurrentAdmin(admin);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleView = (admin) => {
    setFormData({
      Name: admin.Name,
      contact: admin.contact,
      email: admin.email,
      companyName: admin.companyName,
      password: "12345678", // Automatically set password
    });
    setCurrentAdmin(admin);
    setModalMode("view");
    setShowModal(true);
  };

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1);
  };

  // Filter companies that already have an admin
  const availableCompanies = companyData.filter(
    (company) =>
      !adminData.some((admin) => admin.companyName === company.companyName)
  );

  return (
    <div className="table-responsive m-2">
      <h2 className="companies">Admin List</h2>
      <div className="d-flex justify-content-between flex-row-reverse mb-2">
        <Button
          variant="success"
          onClick={() => {
            setFormData({
              Name: "",
              contact: "",
              email: "",
              companyName: "",
              password: "12345678", // Automatically set password
              roll: "admin",
              rollId: "2",
            });
            setCurrentAdmin(null);
            setModalMode("add");
            setShowModal(true);
          }}
        >
          <IoAddOutline />
        </Button>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          style={{ marginTop: "10px", width: "300px" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="table table-bordered">
        <thead className="text-white">
          <tr>
            <th className="bg-black text-white">#</th>
            <th className="bg-black text-white">Name</th>
            <th className="bg-black text-white">Contact</th>
            <th className="bg-black text-white">Email</th>
            <th className="bg-black text-white">Company Name</th>
            <th className="bg-black text-white text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((admin, index) => (
            <tr key={admin.id}>
              <td>{index + 1}</td>
              <td>{admin.Name}</td>
              <td>{admin.contact}</td>
              <td>{admin.email}</td>
              <td>{admin.companyName}</td>
              <td className="d-flex justify-content-evenly">
                <button
                  className="btn btn-success"
                  onClick={() => handleEdit(admin)}
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
                  onClick={() => handleView(admin)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <div className="pagination d-flex justify-content-between MyMianDiv fw-semibold  Myflex">
          <div className="d-flex mb-4 ml-4">
            <div className="mt-2 mr-2">Show:</div>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="form-select w-auto"
            >
              <option value={5}>5 </option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <div className="mt-2 ml-2">per page</div>
          </div>

          <div className="d-flex">
            <li className="page-item mt-2">
              <span className="">
                {currentPage} of {totalPages}
              </span>
            </li>
            <div className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <div onClick={handlePreviousPage} type="button" className="btn ">
                <BsArrowLeft className="textsName FaArrowLeft" />
              </div>
            </div>
            {pageNumbers.map((number) => (
              <div
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(number)}
                  className="btn btn-outline-secondary border-0 mx-1 MyBTN"
                >
                  {number}
                </button>
              </div>
            ))}
            <div
              className={`page-item ${
                currentPage === pageNumbers.length ? "disabled" : ""
              }`}
            >
              <div onClick={handleNextPage} type="button" className="btn ">
                <BsArrowRight className="textsName FaArrowLeft" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="mt-24"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "view"
              ? "View Admin"
              : modalMode === "edit"
              ? "Edit Admin"
              : "Add New Admin"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode === "view" ? (
            <div className="container row g-3">
              <div className="col-lg-6">
                <p>
                  <strong>Name:</strong>
                </p>
                <p className="border rounded p-2">{formData.companyName}</p>
              </div>
              <div className="col-lg-6">
                <p>
                  <strong>Contact:</strong>
                </p>
                <p className="border rounded p-2">{formData.contact}</p>
              </div>
              <div className="col-lg-6 mt-0">
                <p>
                  <strong>Email:</strong>
                </p>
                <p className="border rounded p-2">{formData.email}</p>
              </div>
              <div className="col-lg-6 mt-0">
                <p>
                  <strong>Company Name:</strong>
                </p>
                <p className="border rounded p-2">{formData.companyName}</p>
              </div>
            </div>
          ) : (
            <Form className="container row g-3">
              <Form.Group controlId="formAdminName" className="col-lg-6">
                <h6>Name</h6>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.Name}
                  readOnly={modalMode === "view"}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formAdminContact" className="col-lg-6">
                <h6>Contact</h6>
                <Form.Control
                  type="text"
                  placeholder="Enter contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  isInvalid={!!errors.contact}
                  readOnly={modalMode === "view"}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contact}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formAdminEmail" className="col-lg-6">
                <h6>Email</h6>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  readOnly={modalMode === "view"}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              {modalMode === "edit" ? (
                <Form.Group
                  controlId="formAdminCompanyName"
                  className="col-lg-6"
                >
                  <h6>Company Name</h6>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    readOnly
                  />
                </Form.Group>
              ) : (
                <Form.Group
                  controlId="formAdminCompanyName"
                  className="col-lg-6"
                >
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.companyName}
                  >
                    <option value="">Select a company</option>
                    {availableCompanies.map((company) => (
                      <option key={company.id} value={company.companyName}>
                        {company.companyName}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.companyName}
                  </Form.Control.Feedback>
                </Form.Group>
              )}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          {modalMode !== "view" && (
            <Button variant="success" onClick={handleAddOrUpdateAdmin}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminTable;
