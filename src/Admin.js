
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome';
import './Admin.css';
import { Button } from 'react-bootstrap';

function Admin() {
  const [adminData, setAdminData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    rollId: '',
    companyName: '',
    email: '',
    contact: '',
  });
  const [newAdminData, setNewAdminData] = useState({
    Name: '',
    rollId: '',
    companyName: '',
    email: '',
    contact: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({
    edit: {},
    add: {}
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:8000/admin')
      .then(response => {
        setAdminData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the admin data!", error);
      });

    axios.get('http://localhost:8000/company')
      .then(response => {
        setCompanyData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the company data!", error);
      });
  }, []);

  useEffect(() => {
    const results = adminData.filter(admin =>
      admin.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
  }, [searchQuery, adminData]);

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setFormData(admin);
    setShowEditModal(true);
  };

  const handleDetailsClick = (admin) => {
    setSelectedAdmin(admin);
    setShowDetailsModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedAdmin(null);
    setErrors(prevErrors => ({ ...prevErrors, edit: {} }));
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedAdmin(null);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewAdminData({
      Name: '',
      rollId: '',
      companyName: '',
      email: '',
      contact: '',
    });
    setErrors(prevErrors => ({ ...prevErrors, add: {} }));
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.Name.trim()) errors.Name = "Name is required.";
    if (!data.contact.trim()) {
      errors.contact = "Contact is required.";
    } else if (data.contact.length !== 10) {
      errors.contact = "Contact must be exactly 10 digits.";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid.";
    }
    if (!data.companyName.trim()) errors.companyName = "Company Name is required.";
    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(prevErrors => ({ ...prevErrors, edit: validationErrors }));
      return;
    }

    axios.put(`http://localhost:8000/admin/${selectedAdmin.id}`, formData)
      .then(response => {
        const updatedData = adminData.map(admin =>
          admin.id === selectedAdmin.id ? response.data : admin
        );
        setAdminData(updatedData);
        handleCloseEditModal();
      })
      .catch(error => {
        console.error("There was an error saving the admin data!", error);
      });
  };

  const handleAdd = () => {
    const validationErrors = validateForm(newAdminData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(prevErrors => ({ ...prevErrors, add: validationErrors }));
      return;
    }

    const adminDataWithPassword = {
      ...newAdminData,
      password: '12345678'
    };

    axios.post('http://localhost:8000/admin', adminDataWithPassword)
      .then(response => {
        setAdminData([...adminData, response.data]);
        handleCloseAddModal();
      })
      .catch(error => {
        console.error("There was an error adding the new admin data!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Name' && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
    if (name === 'contact' && !/^\d{0,10}$/.test(value)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Name' && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
    if (name === 'contact' && !/^\d{0,10}$/.test(value)) {
      return;
    }
    setNewAdminData({
      ...newAdminData,
      [name]: value,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to remove this admin?',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/admin/${id}`)
          .then(() => {
            Swal.fire('Removed successfully.', '', 'success');
            const updatedData = adminData.filter(admin => admin.id !== id);
            setAdminData(updatedData);
          })
          .catch(error => {
            Swal.fire('Error', error.message, 'error');
          });
      } else if (result.isDismissed) {
        Swal.fire('Deletion canceled', '', 'info');
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="table-responsive m-2">
      <h2>Admin List</h2>
      <div className="d-flex justify-content-between flex-row-reverse m-2">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Add New (+)
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
            <th className="bg-black text-white">Serial No.</th>
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
              <td className="d-flex justify-content-evenly">               <button
                className="btn btn-success"
                onClick={() => handleEditClick(admin)}              >
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
                  onClick={() => handleDetailsClick(admin)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              onClick={handlePreviousPage}
              className="page-link"
            >
              Previous
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
            <button
              onClick={handleNextPage}
              className="page-link"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Add Admin Modal */}
      <div className={`modal ${showAddModal ? 'show' : ''}`} style={{ display: showAddModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Admin</h5>
              <button type="button" className="close" onClick={handleCloseAddModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form className='container row g-3'>
                <div className="form-group col-lg-6">
                  <label>Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.add.Name ? 'is-invalid' : ''}`}
                    name="Name"
                    value={newAdminData.Name}
                    onChange={handleNewChange}
                  />
                  {errors.add.Name && <div className="invalid-feedback">{errors.add.Name}</div>}
                </div>
                <div className="form-group col-lg-6">
                  <label>Contact</label>
                  <input
                    type="text"
                    className={`form-control ${errors.add.contact ? 'is-invalid' : ''}`}
                    name="contact"
                    value={newAdminData.contact}
                    onChange={handleNewChange}
                  />
                  {errors.add.contact && <div className="invalid-feedback">{errors.add.contact}</div>}
                </div>
                <div className="form-group col-lg-6">
                  <label>Company Name</label>
                  <select
                    className={`form-control ${errors.add.companyName ? 'is-invalid' : ''}`}
                    name="companyName"
                    value={newAdminData.companyName}
                    onChange={handleNewChange}
                  >
                    <option value="">Select Company</option>
                    {companyData.map(company => (
                      <option key={company.id} value={company.companyName}>
                        {company.companyName}
                      </option>
                    ))}
                  </select>
                  {errors.add.companyName && <div className="invalid-feedback">{errors.add.companyName}</div>}
                </div>
                <div className="form-group col-lg-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.add.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={newAdminData.email}
                    onChange={handleNewChange}
                  />
                  {errors.add.email && <div className="invalid-feedback">{errors.add.email}</div>}
                </div>
              </form>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <Button variant="primary" onClick={handleAdd}>Add Admin</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Admin Modal */}
      <div className={`modal ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Admin</h5>
              <button type="button" className="close" onClick={handleCloseEditModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.edit.Name ? 'is-invalid' : ''}`}
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                  />
                  {errors.edit.Name && <div className="invalid-feedback">{errors.edit.Name}</div>}
                </div>
                <div className="form-group">
                  <label>Contact</label>
                  <input
                    type="text"
                    className={`form-control ${errors.edit.contact ? 'is-invalid' : ''}`}
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  {errors.edit.contact && <div className="invalid-feedback">{errors.edit.contact}</div>}
                </div>
                {!selectedAdmin && (
                  <div className="form-group">
                    <label>Company Name</label>
                    <select
                      className={`form-control ${errors.edit.companyName ? 'is-invalid' : ''}`}
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                    >
                      <option value="">Select Company</option>
                      {companyData.map(company => (
                        <option key={company.id} value={company.companyName}>
                          {company.companyName}
                        </option>
                      ))}
                    </select>
                    {errors.edit.companyName && <div className="invalid-feedback">{errors.edit.companyName}</div>}
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.edit.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.edit.email && <div className="invalid-feedback">{errors.edit.email}</div>}
                </div>
              </form>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Admin Modal */}
      <div className={`modal ${showDetailsModal ? 'show' : ''}`} style={{ display: showDetailsModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Admin Details</h5>
              <button type="button" className="close" onClick={handleCloseDetailsModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {selectedAdmin && (
                <div>
                  <div className='d-flex gap-2'>
                    <div className='col-lg-6'>
                      <p><strong>Name:</strong></p>
                      <div className='border rounded p-2'>{selectedAdmin.Name}</div>
                    </div>
                    <div className='col-lg-6'>
                      <p><strong>Contact:</strong></p>
                      <div className='border rounded p-2'>{selectedAdmin.contact}</div>
                    </div>
                  </div>

                  <div className='d-flex gap-2 mt-2'>
                    <div className='col-lg-6'>
                      <p><strong>Email</strong></p>
                      <div className='border rounded p-2'>{selectedAdmin.email}</div>
                    </div>
                    <div className='col-lg-6'>
                      <p><strong>Company name</strong></p>
                      <div className='border rounded p-2'>{selectedAdmin.companyName}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
