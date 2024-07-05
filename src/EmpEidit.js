


import React, { useState, useEffect } from 'react';

function EmpEidit({ id, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [packageAmount, setPackageAmount] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/employee/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        setDesignation(data.Designation);
        setPackageAmount(data.Packege);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedEmployee = { name, email, phone, address, Designation: designation, Packege: packageAmount };

    fetch(`http://localhost:8000/employee/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    })
      .then((res) => res.json())
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Designation</label>
        <input
          type="text"
          className="form-control"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Package</label>
        <input
          type="text"
          className="form-control"
          value={packageAmount}
          onChange={(e) => setPackageAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Save</button>
    </form>
  );
}

export default EmpEidit;