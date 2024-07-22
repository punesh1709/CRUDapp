// import React, { useEffect, useState } from 'react';

// function MainContent() {
//   const [companies, setCompanies] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     // Fetch companies data
//     fetch('http://localhost:8000/company') // Ensure endpoint matches your JSON Server setup
//       .then(response => response.json())
//       .then(data => setCompanies(data))
//       .catch(error => console.error('Error fetching companies:', error));

//     // Fetch employees data
//     fetch('http://localhost:8000/employee') // Ensure endpoint matches your JSON Server setup
//       .then(response => response.json())
//       .then(data => setEmployees(data))
//       .catch(error => console.error('Error fetching employees:', error));
//   }, []);

//   return (
//     <div className='MyContent'>
//       <h2 className='text-center'>Companies</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Company Name</th>
//             <th>Contact</th>
//             <th>Address</th>
//             <th>Section</th>
//             <th>Industry</th>
//           </tr>
//         </thead>
//         <tbody>
//           {companies.map(company => (
//             <tr key={company.id}>
//               <td>{company.id}</td>
//               <td>{company.companyName}</td>
//               <td>{company.contact}</td>
//               <td>{company.address}</td>
//               <td>{company.section}</td>
//               <td>{company.industry}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>


//     </div>
//   );
// }

// export default MainContent;


// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './fontAwesome';
// import { Button } from 'react-bootstrap';
// function MainContent() {
//   const [companies, setCompanies] = useState([]);
 

//   useEffect(() => {
//     // Fetch companies data
//     fetch('http://localhost:8000/company') // Ensure endpoint matches your JSON Server setup
//       .then(response => response.json())
//       .then(data => setCompanies(data))
//       .catch(error => console.error('Error fetching companies:', error));
//   }, []);

  

//   return (
//     <div class="table-responsive m-2">
//       <div className='MyContent'>
//         <h2 className='text-center'>Companies</h2>
//         <div className="d-flex justify-content-between flex-row-reverse m-2">
//               <Button variant="success" >
//                 Add New (+)
//               </Button>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search"
//                 style={{ marginTop: "10px", width: "300px" }}
//               />
//             </div>
//         <table className="table table-bordered">
//           <thead className="text-white">
//             <tr>
//               <th className="bg-black text-white">ID</th>
//               <th className="bg-black text-white">Company Name</th>
//               <th className="bg-black text-white">Contact</th>
//               <th className="bg-black text-white">Address</th>
//               <th className="bg-black text-white">Section</th>
//               <th className="bg-black text-white">Industry</th>
//               <th className="text-center bg-black text-white">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {companies.map(company => (
//               <tr key={company.id}>
//                 <td>{company.id}</td>
//                 <td>{company.companyName}</td>
//                 <td>{company.contact}</td>
//                 <td>{company.address}</td>
//                 <td>{company.section}</td>
//                 <td>{company.industry}</td>
//                 <td className="d-flex justify-content-evenly">
//                   <button

//                     className="btn btn-success"
//                   >
//                     <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                   </button>
//                   <button

//                     className="btn btn-danger"
//                   >
//                     <FontAwesomeIcon icon="fa-solid fa-trash" />
//                   </button>
//                   <button

//                     className="btn btn-primary"
//                   >
//                     <FontAwesomeIcon icon="fa-solid fa-circle-info" />
//                   </button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>


//       </div>
//     </div>
//   );
// }

// export default MainContent;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontAwesome';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    industry: ''
  });

  const initialCompanyState = {
    companyName: '',
    contact: '',
    address: '',
    section: '',
    industry: ''
  };

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setNewCompany(initialCompanyState);
    setIsEditing(false);
    setIsViewing(false);
    setShow(true);
  };

  const handleEditShow = (company) => {
    setNewCompany(company);
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

  const handleSubmit = () => {
    if (isEditing) {
      // Update company data
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
          company.industry.toLowerCase().includes(searchText.toLowerCase())
        ));
        handleClose();
      })
      .catch(error => console.error('Error updating company:', error));
    } else {
      // Add new company data
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
          company.industry.toLowerCase().includes(searchText.toLowerCase())
        ));
        handleClose();
      })
      .catch(error => console.error('Error adding company:', error));
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/company/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedCompanies = companies.filter(company => company.id !== id);
      setCompanies(updatedCompanies);
      setFilteredCompanies(updatedCompanies.filter(company =>
        company.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
        company.contact.toLowerCase().includes(searchText.toLowerCase()) ||
        company.address.toLowerCase().includes(searchText.toLowerCase()) ||
        company.section.toLowerCase().includes(searchText.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchText.toLowerCase())
      ));
    })
    .catch(error => console.error('Error deleting company:', error));
  };

  useEffect(() => {
    // Fetch companies data
    fetch('http://localhost:8000/company')
      .then(response => response.json())
      .then(data => {
        setCompanies(data);
        setFilteredCompanies(data);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredCompanies(companies.filter(company =>
      company.companyName.toLowerCase().includes(value.toLowerCase()) ||
      company.contact.toLowerCase().includes(value.toLowerCase()) ||
      company.address.toLowerCase().includes(value.toLowerCase()) ||
      company.section.toLowerCase().includes(value.toLowerCase()) ||
      company.industry.toLowerCase().includes(value.toLowerCase())
    ));
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
              <th className="bg-black text-white">ID</th>
              <th className="bg-black text-white">Company Name</th>
              <th className="bg-black text-white">Contact</th>
              <th className="bg-black text-white">Address</th>
              <th className="bg-black text-white">Section</th>
              <th className="bg-black text-white">Industry</th>
              <th className="text-center bg-black text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map(company => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.companyName}</td>
                <td>{company.contact}</td>
                <td>{company.address}</td>
                <td>{company.section}</td>
                <td>{company.industry}</td>
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
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Company' : isViewing ? 'Company Details' : 'Add New Company'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isViewing ? (
            <div>
              <p><strong>Company Name:</strong> {newCompany.companyName}</p>
              <p><strong>Contact:</strong> {newCompany.contact}</p>
              <p><strong>Address:</strong> {newCompany.address}</p>
              <p><strong>Section:</strong> {newCompany.section}</p>
              <p><strong>Industry:</strong> {newCompany.industry}</p>
            </div>
          ) : (
            <Form>
              <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={newCompany.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </Form.Group>
              <Form.Group controlId="formContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={newCompany.contact}
                  onChange={handleChange}
                  placeholder="Enter contact"
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={newCompany.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                />
              </Form.Group>
              <Form.Group controlId="formSection">
                <Form.Label>Section</Form.Label>
                <Form.Control
                  type="text"
                  name="section"
                  value={newCompany.section}
                  onChange={handleChange}
                  placeholder="Enter section"
                />
              </Form.Group>
              <Form.Group controlId="formIndustry">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  type="text"
                  name="industry"
                  value={newCompany.industry}
                  onChange={handleChange}
                  placeholder="Enter industry"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        {!isViewing && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default MainContent;
