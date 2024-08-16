import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddEmployeeModal = ({ showAddModal, handleClose, setAdmins, setFilteredAdmins }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    Designation: '',
    Packege: '',
    companyName: '',
  });

  const [errors, setErrors] = useState({});

  const handleAddEmployee = () => {
    // Validate name
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!newEmployee.name || !nameRegex.test(newEmployee.name)) {
      setErrors({ name: 'Name must contain only alphabetic characters and cannot be empty.' });
      return;
    }

    // If validation passes, proceed with the API call
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        setAdmins((prev) => [...prev, data]);
        setFilteredAdmins((prev) => [...prev, data]);
        handleClose();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'New employee added successfully!',
        });
      })
      .catch((error) => console.error('Error adding employee:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });

    // Clear validation errors when the user starts typing again
    if (name === 'name') {
      setErrors({ ...errors, name: '' });
    }
  };

  return (
    <Modal show={showAddModal} onHide={handleClose} className="mt-20">
      <Modal.Header closeButton>
        <Modal.Title>Add New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          {/* Other form fields */}
          <Button variant="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeModal;
