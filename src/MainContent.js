
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import Swal from 'sweetalert2';
import { IoAddOutline } from "react-icons/io5";

function MainContent() {
  const [companies, setCompanies] = useState([]);
  const [viewingCompany, setViewingCompany] = useState(null);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [companiesPerPage, setCompaniesPerPage] = useState(10); // Initial items per page

  const [newCompany, setNewCompany] = useState({
    companyName: '',
    contact: '',
    address: '',
    section: '',
    email: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const initialCompanyState = {
    companyName: '',
    contact: '',
    address: '',
    section: '',
    email: ''
  };

  const handleCompaniesPerPageChange = (e) => {
    setCompaniesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };



  const handleViewShow = (company) => {
    setViewingCompany(company);
    setShow(true);
    setIsViewing(true);
    setIsEditing(false);
  };

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setNewCompany(initialCompanyState);
    setValidationErrors({});
    setIsEditing(false);
    setIsViewing(false);
    setShow(true);
  };

  const handleEditShow = (company) => {
    setNewCompany(company);
    setValidationErrors({});
    setIsEditing(true);
    setIsViewing(false);
    setCurrentCompany(company);
    setShow(true);
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contact') {
      if (/^\d{0,10}$/.test(value)) {
        setNewCompany({ ...newCompany, [name]: value });
      }
    } else if (name === 'companyName') {
      if (/^[A-Za-z\s]*$/.test(value)) {
        setNewCompany({ ...newCompany, [name]: value });
      }
    } else {
      setNewCompany({ ...newCompany, [name]: value });
    }
  };

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    const charStr = String.fromCharCode(charCode);

    if (e.target.name === 'companyName' && !/^[A-Za-z\s]+$/.test(charStr)) {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!newCompany.companyName.trim()) {
      errors.companyName = 'Company Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(newCompany.companyName)) {
      errors.companyName = 'Company Name can only contain letters and spaces';
    }

    if (!newCompany.contact.trim()) {
      errors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(newCompany.contact)) {
      errors.contact = 'Contact must be exactly 10 digits';
    }

    if (!newCompany.address.trim()) errors.address = 'Address is required';
    if (!newCompany.section.trim()) errors.section = 'Section is required';
    if (!newCompany.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newCompany.email)) errors.email = 'Email format is invalid';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isEditing) {
      fetch(`http://localhost:8000/company/${currentCompany.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCompany)
      })
        .then(response => response.json())
        .then(data => {
          const updatedCompanies = companies.map(company =>
            company.id === data.id ? data : company
          );
          setCompanies(updatedCompanies);
          setFilteredCompanies(updatedCompanies.filter(company =>
            company.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
            company.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            company.address.toLowerCase().includes(searchText.toLowerCase()) ||
            company.section.toLowerCase().includes(searchText.toLowerCase()) ||
            company.email.toLowerCase().includes(searchText.toLowerCase())
          ));
          handleClose();
        })
        .catch(error => console.error('Error updating company:', error));
    } else {
      fetch('http://localhost:8000/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCompany)
      })
        .then(response => response.json())
        .then(data => {
          const updatedCompanies = [...companies, data];
          setCompanies(updatedCompanies);
          setFilteredCompanies(updatedCompanies.filter(company =>
            company.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
            company.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            company.address.toLowerCase().includes(searchText.toLowerCase()) ||
            company.section.toLowerCase().includes(searchText.toLowerCase()) ||
            company.email.toLowerCase().includes(searchText.toLowerCase())
          ));
          handleClose();
        })
        .catch(error => console.error('Error adding company:', error));
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to remove this company?',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:8000/admin')
          .then(response => response.json())
          .then(admins => {
            const companyToDelete = companies.find(company => company.id === id);
            if (!companyToDelete) {
              throw new Error('Company not found');
            }
            const adminsToDelete = admins.filter(admin => admin.companyName === companyToDelete.companyName);

            return Promise.all(adminsToDelete.map(admin =>
              fetch(`http://localhost:8000/admin/${admin.id}`, { method: 'DELETE' })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`Failed to delete admin ${admin.id}`);
                  }
                  return response.json();
                })
            ))
              .then(() => {
                return fetch(`http://localhost:8000/company/${id}`, { method: 'DELETE' })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Failed to delete company');
                    }
                    return response.json();
                  });
              })
              .then(() => {
                Swal.fire('Removed successfully.', '', 'success');
                const updatedCompanies = companies.filter(company => company.id !== id);
                setCompanies(updatedCompanies);
                setFilteredCompanies(updatedCompanies.filter(company =>
                  company.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
                  company.contact.toLowerCase().includes(searchText.toLowerCase()) ||
                  company.address.toLowerCase().includes(searchText.toLowerCase()) ||
                  company.section.toLowerCase().includes(searchText.toLowerCase()) ||
                  company.email.toLowerCase().includes(searchText.toLowerCase())
                ));
              })
              .catch(error => {
                console.error('Error during deletion:', error);
                Swal.fire('Error', error.message, 'error');
              });
          })
          .catch(error => {
            console.error('Error fetching admins:', error);
            Swal.fire('Error', error.message, 'error');
          });
      }
    });
  };

  useEffect(() => {
    fetch('http://localhost:8000/company')
      .then(response => response.json())
      .then(data => {
        setCompanies(data);
        setFilteredCompanies(data);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, companies]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredCompanies(companies.filter(company =>
      company.companyName.toLowerCase().includes(value.toLowerCase()) ||
      company.contact.toLowerCase().includes(value.toLowerCase()) ||
      company.address.toLowerCase().includes(value.toLowerCase()) ||
      company.section.toLowerCase().includes(value.toLowerCase()) ||
      company.email.toLowerCase().includes(value.toLowerCase())
    ));
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

  return (
    <div className="table-responsive m-2">
      <div className='MyContent'>
        <h2 className='companies'>Company</h2>
        <div className="d-flex justify-content-between flex-row-reverse mb-2">
          <Button variant="success" onClick={handleShow}>
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
              <th className="bg-black text-white">Sr No</th>
              <th className="bg-black text-white">Company Name</th>
              <th className="bg-black text-white">Contact</th>
              <th className="bg-black text-white">Address</th>
              <th className="bg-black text-white">Sector</th>
              <th className="bg-black text-white">Email</th>
              <th className="text-center bg-black text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company, index) => (
              <tr key={company.id}>
                <td>{index + 1 + indexOfFirstCompany}</td>
                <td>{company.companyName}</td>
                <td>{company.contact}</td>
                <td>{company.address}</td>
                <td>{company.section}</td>
                <td>{company.email}</td>
                <td className="d-flex justify-content-evenly">
                  <button
                    className="btn btn-success"
                    onClick={() => handleEditShow(company)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(company.id)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewShow(company)}
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
            <select value={companiesPerPage} onChange={handleCompaniesPerPageChange} className="form-select w-auto">
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
                <BsArrowLeft className="textsName FaArrowLeft" />
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
                <BsArrowRight className="textsName FaArrowLeft" />
              </div>
            </div>


          </div>
        </div>

        <Modal show={show} onHide={handleClose} className='mt-20'>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Edit Company' : isViewing ? 'View Company Details' : 'Add New Company'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container row g-3">
              <div className="col-lg-6">
                <Form.Group controlId="formCompanyName">
                  <h6>Company Name</h6>
                  {isViewing ? (
                    <p className='border rounded p-2'>{viewingCompany?.companyName}</p>
                  ) : (
                    <Form.Control
                      type="text"
                      name="companyName"
                      value={newCompany.companyName}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter company name"
                      className={`form-control ${validationErrors.companyName ? 'is-invalid' : ''}`}
                    />
                  )}
                  {validationErrors.companyName && !isViewing && (
                    <div className="invalid-feedback">
                      {validationErrors.companyName}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="formContact">
                  <h6>Contact</h6>
                  {isViewing ? (
                    <p className='border rounded p-2'>{viewingCompany?.contact}</p>
                  ) : (
                    <Form.Control
                      type="text"
                      name="contact"
                      value={newCompany.contact}
                      onChange={handleChange}
                      placeholder="Enter contact"
                      className={`form-control ${validationErrors.contact ? 'is-invalid' : ''}`}
                    />
                  )}
                  {validationErrors.contact && !isViewing && (
                    <div className="invalid-feedback">
                      {validationErrors.contact}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="formAddress">
                  <h6>Address</h6>
                  {isViewing ? (
                    <p className='border rounded p-2'>{viewingCompany?.address}</p>
                  ) : (
                    <Form.Control
                      type="text"
                      name="address"
                      value={newCompany.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                    />
                  )}
                  {validationErrors.address && !isViewing && (
                    <div className="invalid-feedback">
                      {validationErrors.address}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="formSection">
                  <h6>Sector</h6>
                  {isViewing ? (
                    <p className='border rounded p-2'>{viewingCompany?.section}</p>
                  ) : (
                    <Form.Select
                      name="section"
                      value={newCompany.section}
                      onChange={handleChange}
                      className={`form-control ${validationErrors.section ? 'is-invalid' : ''}`}
                    >
                      <option  value="">Select a sector</option>
                      <option className='' value="consumer goods">Consumer Goods</option>
                      <option value="banking">Banking</option>
                      <option value="real estate">Real Estate</option>
                      <option value="IT">IT</option>
                    </Form.Select>
                  )}
                  {validationErrors.section && !isViewing && (
                    <div className="invalid-feedback">
                      {validationErrors.section}  
                    </div>
                  )}
                </Form.Group>
              </div>



              <div className="col-lg-6">
                <Form.Group controlId="formEmail">  
                  <h6>Email</h6>
                  {isViewing ? (
                    <p className='border rounded p-2'>{viewingCompany?.email}</p>
                  ) : (
                    <Form.Control
                      type="email"
                      name="email"
                      value={newCompany.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                    />
                  )}
                  {validationErrors.email && !isViewing && (
                    <div className="invalid-feedback">
                      {validationErrors.email}
                    </div>
                  )}
                </Form.Group>
              </div>
              {!isViewing && (
                <div className="col-lg-12">
                  <div className="form-group d-flex justify-content-center">
                    <Button variant="primary" onClick={handleSubmit} className="btn btn-success px-4 my-4">
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default MainContent;
