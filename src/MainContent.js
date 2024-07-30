import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Swal from 'sweetalert2';

function MainContent() {
  const [companies, setCompanies] = useState([]);
  const [viewingCompany, setViewingCompany] = useState(null);

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
    companyName: '',
    contact: '',
    address: '',
    section: '',
    email: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const initialCompanyState = {
    companyName: '',
    contact: '',
    address: '',
    section: '',
    email: ''
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



  const handleChange = (e) => {
    const { name, value } = e.target;

    // For contact field, only allow numeric values and restrict length to 10 digits
    if (name === 'contact') {
      if (/^\d{0,10}$/.test(value)) {
        setNewCompany({ ...newCompany, [name]: value });
      }
    } else if (name === 'companyName') {
      // For companyName field, allow only letters and spaces
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

    // Allow only letters and spaces for companyName
    if (e.target.name === 'companyName' && !/^[A-Za-z\s]+$/.test(charStr)) {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate companyName
    if (!newCompany.companyName.trim()) {
      errors.companyName = 'Company Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(newCompany.companyName)) {
      errors.companyName = 'Company Name can only contain letters and spaces';
    }

    // Validate contact
    if (!newCompany.contact.trim()) {
      errors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(newCompany.contact)) {
      errors.contact = 'Contact must be exactly 10 digits';
    }

    // Additional validations for other fields
    if (!newCompany.address.trim()) errors.address = 'Address is required';
    if (!newCompany.section.trim()) errors.section = 'Section is required';
    if (!newCompany.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newCompany.email)) errors.email = 'Email format is invalid';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return; // Stop if validation fails

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
        // Fetch all admins to find those associated with the company
        fetch('http://localhost:8000/admin')
          .then(response => response.json())
          .then(admins => {
            // Find admins associated with the company to be deleted
            const companyToDelete = companies.find(company => company.id === id);
            if (!companyToDelete) {
              throw new Error('Company not found');
            }
            const adminsToDelete = admins.filter(admin => admin.companyName === companyToDelete.companyName);

            // Delete admins associated with the company
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
                // Now delete the company itself
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

  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="table-responsive m-2">
      <div className='MyContent'>
        <h2>Companies</h2>
        <div className="d-flex justify-content-between flex-row-reverse mb-2">
          <Button variant="success" onClick={handleShow}>
            Add New (+)
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
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
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
              <option value="">Select a sector</option>
              <option value="consumer goods">Consumer Goods</option>
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
