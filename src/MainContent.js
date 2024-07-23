


// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './fontAwesome';
// import { Button, Modal, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; // Ensure you have the CSS for styling
// import Swal from 'sweetalert2';

// function MainContent() {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [show, setShow] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isViewing, setIsViewing] = useState(false);
//   const [currentCompany, setCurrentCompany] = useState(null);
//   const [newCompany, setNewCompany] = useState({
//     companyName: '',
//     contact: '',
//     address: '',
//     section: '',
//     industry: '',
//     email: '' // Added email field
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const initialCompanyState = {
//     companyName: '',
//     contact: '',
//     address: '',
//     section: '',
//     industry: '',
//     email: '' // Added email field
//   };

//   const handleClose = () => setShow(false);

//   const handleShow = () => {
//     setNewCompany(initialCompanyState);
//     setIsEditing(false);
//     setIsViewing(false);
//     setShow(true);
//   };

//   const handleEditShow = (company) => {
//     setNewCompany(company);
//     setIsEditing(true);
//     setIsViewing(false);
//     setCurrentCompany(company);
//     setShow(true);
//   };

//   const handleViewShow = (company) => {
//     setNewCompany(company);
//     setIsEditing(false);
//     setIsViewing(true);
//     setCurrentCompany(company);
//     setShow(true);
//   };

//   const handleChange = (e) => {
//     setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     if (isEditing) {
//       // Update company data
//       fetch(`http://localhost:8000/company/${currentCompany.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newCompany)
//       })
//       .then(response => response.json())
//       .then(data => {
//         const updatedCompanies = companies.map(company =>
//           company.id === data.id ? data : company
//         );
//         setCompanies(updatedCompanies);
//         setFilteredCompanies(updatedCompanies.filter(company =>
//           company.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.contact.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.address.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.section.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.industry.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.email.toLowerCase().includes(searchText.toLowerCase()) // Filter by email
//         ));
//         handleClose();
//       })
//       .catch(error => console.error('Error updating company:', error));
//     } else {
//       // Add new company data
//       fetch('http://localhost:8000/company', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newCompany)
//       })
//       .then(response => response.json())
//       .then(data => {
//         const updatedCompanies = [...companies, data];
//         setCompanies(updatedCompanies);
//         setFilteredCompanies(updatedCompanies.filter(company =>
//           company.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.contact.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.address.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.section.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.industry.toLowerCase().includes(searchText.toLowerCase()) ||
//           company.email.toLowerCase().includes(searchText.toLowerCase()) // Filter by email
//         ));
//         handleClose();
//       })
//       .catch(error => console.error('Error adding company:', error));
//     }
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Do you want to remove this company?',
//       showCancelButton: true,
//       confirmButtonText: 'Remove',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`http://localhost:8000/company/${id}`, {
//           method: 'DELETE'
//         })
//         .then(() => {
//           Swal.fire('Removed successfully.', '', 'success');
//           const updatedCompanies = companies.filter(company => company.id !== id);
//           setCompanies(updatedCompanies);
//           setFilteredCompanies(updatedCompanies.filter(company =>
//             company.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
//             company.contact.toLowerCase().includes(searchText.toLowerCase()) ||
//             company.address.toLowerCase().includes(searchText.toLowerCase()) ||
//             company.section.toLowerCase().includes(searchText.toLowerCase()) ||
//             company.industry.toLowerCase().includes(searchText.toLowerCase()) ||
//             company.email.toLowerCase().includes(searchText.toLowerCase()) // Filter by email
//           ));
//         })
//         .catch(error => {
//           Swal.fire('Error', error.message, 'error');
//         });
//       } else if (result.isDismissed) {
//         Swal.fire('Deletion canceled', '', 'info');
//       }
//     });
//   };

//   useEffect(() => {
//     // Fetch companies data
//     fetch('http://localhost:8000/company')
//       .then(response => response.json())
//       .then(data => {
//         setCompanies(data);
//         setFilteredCompanies(data);
//       })
//       .catch(error => console.error('Error fetching companies:', error));
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1); // Reset to page 1 on search or data change
//   }, [searchText, companies]);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchText(value);
//     setFilteredCompanies(companies.filter(company =>
//       company.companyName.toLowerCase().includes(value.toLowerCase()) ||
//       company.contact.toLowerCase().includes(value.toLowerCase()) ||
//       company.address.toLowerCase().includes(value.toLowerCase()) ||
//       company.section.toLowerCase().includes(value.toLowerCase()) ||
//       company.industry.toLowerCase().includes(value.toLowerCase()) ||
//       company.email.toLowerCase().includes(value.toLowerCase()) // Filter by email
//     ));
//   };

//   // Pagination logic
//   const indexOfLastCompany = currentPage * itemsPerPage;
//   const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
//   const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

//   const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="table-responsive m-2">
//       <div className='MyContent'>
//         <h2 className='text-center'>Companies</h2>
//         <div className="d-flex justify-content-between flex-row-reverse m-2">
//           <Button variant="success" onClick={handleShow}>
//             Add New (+)
//           </Button>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search"
//             style={{ marginTop: "10px", width: "300px" }}
//             value={searchText}
//             onChange={handleSearch}
//           />
//         </div>
//         <table className="table table-bordered">
//           <thead className="text-white">
//             <tr>
//               <th className="bg-black text-white">Sr No</th>
//               <th className="bg-black text-white">Company Name</th>
//               <th className="bg-black text-white">Contact</th>
//               <th className="bg-black text-white">Address</th>
//               <th className="bg-black text-white">Section</th>
//               <th className="bg-black text-white">Industry</th>
//               <th className="bg-black text-white">Email</th> {/* New Email Column */}
//               <th className="text-center bg-black text-white">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentCompanies.map((company, index) => (
//               <tr key={company.id}>
//                 <td>{index + 1 + indexOfFirstCompany}</td> {/* Serial Number */}
//                 <td>{company.companyName}</td>
//                 <td>{company.contact}</td>
//                 <td>{company.address}</td>
//                 <td>{company.section}</td>
//                 <td>{company.industry}</td>
//                 <td>{company.email}</td> {/* New Email Data */}
//                 <td className="d-flex justify-content-evenly">
//                   <button
//                     className="btn btn-success"
//                     onClick={() => handleEditShow(company)}
//                   >
//                     <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(company.id)}
//                   >
//                     <FontAwesomeIcon icon="fa-solid fa-trash" />
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleViewShow(company)}
//                   >
//                     <FontAwesomeIcon icon="fa-solid fa-circle-info" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="pagination-container">
//           <Button
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             Previous
//           </Button>
//           {[...Array(totalPages)].map((_, i) => (
//             <Button
//               key={i + 1}
//               onClick={() => handlePageChange(i + 1)}
//               active={i + 1 === currentPage}
//             >
//               {i + 1}
//             </Button>
//           ))}
//           <Button
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? 'Edit Company' : isViewing ? 'Company Details' : 'Add New Company'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {isViewing && currentCompany && (
//             <div className="company-details-modal">
//               <div className="row">
//                 <div className="col-md-6 mb-4">
//                   <p className='mb-0'><strong>Company Name</strong></p>
//                   <div className='border p-2 mt-0 rounded'>{currentCompany.companyName}</div>
//                 </div>
//                 <div className="col-md-6 mb-4">
//                   <p className='mb-0'><strong>Contact</strong></p>
//                   <div className='border p-2 rounded'>{currentCompany.contact}</div>
//                 </div>
//                 <div className="col-md-6 mb-4">
//                   <p className='mb-0'><strong>Address</strong></p>
//                   <div className='border p-2 rounded'>{currentCompany.address}</div>
//                 </div>
//                 <div className="col-md-6 mb-4">
//                   <p className='mb-0'><strong>Section</strong> </p>
//                   <div className='border p-2 rounded'>{currentCompany.section}</div>
//                 </div>
//                 <div className="col-md-6 mb-4">
//                   <p className='mb-0'><strong>Industry</strong></p>
//                   <div className='border p-2 rounded'>{currentCompany.industry}</div>
//                 </div>
//                 <div className="col-md-6 mb-4">
//                   <p className='mb-0'><strong>Email</strong></p>
//                   <div className='border p-2 rounded'>{currentCompany.email}</div> {/* Display email */}
//                 </div>
//               </div>
//             </div>
//           )}
//           {!isViewing && (
//             <Form className="container row g-3">
//               <div className="col-lg-6">
//                 <Form.Group controlId="formCompanyName">
//                   <Form.Label>Company Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="companyName"
//                     value={newCompany.companyName}
//                     onChange={handleChange}
//                     placeholder="Enter company name"
//                     className="form-control"
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-lg-6">
//                 <Form.Group controlId="formContact">
//                   <Form.Label>Contact</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="contact"
//                     value={newCompany.contact}
//                     onChange={handleChange}
//                     placeholder="Enter contact"
//                     className="form-control"
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-lg-6">
//                 <Form.Group controlId="formAddress">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="address"
//                     value={newCompany.address}
//                     onChange={handleChange}
//                     placeholder="Enter address"
//                     className="form-control"
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-lg-6">
//                 <Form.Group controlId="formSection">
//                   <Form.Label>Section</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="section"
//                     value={newCompany.section}
//                     onChange={handleChange}
//                     placeholder="Enter section"
//                     className="form-control"
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-lg-6">
//                 <Form.Group controlId="formIndustry">
//                   <Form.Label>Industry</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="industry"
//                     value={newCompany.industry}
//                     onChange={handleChange}
//                     placeholder="Enter industry"
//                     className="form-control"
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-lg-6">
//                 <Form.Group controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={newCompany.email}
//                     onChange={handleChange}
//                     placeholder="Enter email"
//                     className="form-control"
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-lg-12">
//                 <div className="form-group d-flex justify-content-center">
//                   <Button variant="primary" onClick={handleSubmit} className="btn btn-success px-4 my-4">
//                     Save Changes
//                   </Button>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default MainContent;


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Swal from 'sweetalert2';

function MainContent() {
  const [companies, setCompanies] = useState([]);
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
    industry: '',
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
    industry: '',
    email: ''
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

  const handleViewShow = (company) => {
    setNewCompany(company);
    setIsEditing(false);
    setIsViewing(true);
    setCurrentCompany(company);
    setShow(true);
  };

  const handleChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!newCompany.companyName.trim()) errors.companyName = 'Company Name is required';
    if (!newCompany.contact.trim()) errors.contact = 'Contact is required';
    if (!newCompany.address.trim()) errors.address = 'Address is required';
    if (!newCompany.section.trim()) errors.section = 'Section is required';
    if (!newCompany.industry.trim()) errors.industry = 'Industry is required';
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
          company.industry.toLowerCase().includes(searchText.toLowerCase()) ||
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
          company.industry.toLowerCase().includes(searchText.toLowerCase()) ||
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
        fetch(`http://localhost:8000/company/${id}`, {
          method: 'DELETE'
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
            company.industry.toLowerCase().includes(searchText.toLowerCase()) ||
            company.email.toLowerCase().includes(searchText.toLowerCase())
          ));
        })
        .catch(error => {
          Swal.fire('Error', error.message, 'error');
        });
      } else if (result.isDismissed) {
        Swal.fire('Deletion canceled', '', 'info');
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
      company.industry.toLowerCase().includes(value.toLowerCase()) ||
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
        <h2 className='text-center'>Companies</h2>
        <div className="d-flex justify-content-between flex-row-reverse m-2">
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
              <th className="bg-black text-white">Section</th>
              <th className="bg-black text-white">Industry</th>
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
                <td>{company.industry}</td>
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
        <div className="pagination-container">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              active={i + 1 === currentPage}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Company' : isViewing ? 'Company Details' : 'Add New Company'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isViewing && currentCompany && (
            <div className="company-details-modal">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <p className='mb-0'><strong>Company Name</strong></p>
                  <div className='border p-2 mt-0 rounded'>{currentCompany.companyName}</div>
                </div>
                <div className="col-md-6 mb-4">
                  <p className='mb-0'><strong>Contact</strong></p>
                  <div className='border p-2 rounded'>{currentCompany.contact}</div>
                </div>
                <div className="col-md-6 mb-4">
                  <p className='mb-0'><strong>Address</strong></p>
                  <div className='border p-2 rounded'>{currentCompany.address}</div>
                </div>
                <div className="col-md-6 mb-4">
                  <p className='mb-0'><strong>Section</strong></p>
                  <div className='border p-2 rounded'>{currentCompany.section}</div>
                </div>
                <div className="col-md-6 mb-4">
                  <p className='mb-0'><strong>Industry</strong></p>
                  <div className='border p-2 rounded'>{currentCompany.industry}</div>
                </div>
                <div className="col-md-6 mb-4">
                  <p className='mb-0'><strong>Email</strong></p>
                  <div className='border p-2 rounded'>{currentCompany.email}</div>
                </div>
              </div>
            </div>
          )}
          {!isViewing && (
            <Form className="container row g-3">
              <div className="col-lg-6">
                <Form.Group controlId="formCompanyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={newCompany.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className={`form-control ${validationErrors.companyName ? 'is-invalid' : ''}`}
                  />
                  {validationErrors.companyName && (
                    <div className="invalid-feedback">
                      {validationErrors.companyName}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="formContact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    value={newCompany.contact}
                    onChange={handleChange}
                    placeholder="Enter contact"
                    className={`form-control ${validationErrors.contact ? 'is-invalid' : ''}`}
                  />
                  {validationErrors.contact && (
                    <div className="invalid-feedback">
                      {validationErrors.contact}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={newCompany.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                  />
                  {validationErrors.address && (
                    <div className="invalid-feedback">
                      {validationErrors.address}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="formSection">
                  <Form.Label>Section</Form.Label>
                  <Form.Control
                    type="text"
                    name="section"
                    value={newCompany.section}
                    onChange={handleChange}
                    placeholder="Enter section"
                    className={`form-control ${validationErrors.section ? 'is-invalid' : ''}`}
                  />
                  {validationErrors.section && (
                    <div className="invalid-feedback">
                      {validationErrors.section}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="formIndustry">
                  <Form.Label>Industry</Form.Label>
                  <Form.Control
                    type="text"
                    name="industry"
                    value={newCompany.industry}
                    onChange={handleChange}
                    placeholder="Enter industry"
                    className={`form-control ${validationErrors.industry ? 'is-invalid' : ''}`}
                  />
                  {validationErrors.industry && (
                    <div className="invalid-feedback">
                      {validationErrors.industry}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={newCompany.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                  />
                  {validationErrors.email && (
                    <div className="invalid-feedback">
                      {validationErrors.email}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-12">
                <div className="form-group d-flex justify-content-center">
                  <Button variant="primary" onClick={handleSubmit} className="btn btn-success px-4 my-4">
                    Save Changes
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MainContent;
