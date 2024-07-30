


import React, { useState, useEffect } from 'react';

function EmpEdit({ id, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [packageAmount, setPackageAmount] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const storedEmployee = JSON.parse(localStorage.getItem(`employee-${id}`));
    if (storedEmployee) {
      setName(storedEmployee.name);
      setEmail(storedEmployee.email);
      setPhone(storedEmployee.phone);
      setAddress(storedEmployee.address);
      setDesignation(storedEmployee.Designation);
      setPackageAmount(storedEmployee.Packege);
      setCompanyName(storedEmployee.companyName);
    } else {
      fetch(`http://localhost:8000/employee/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
          setAddress(data.address);
          setDesignation(data.Designation);
          setPackageAmount(data.Packege);
          setCompanyName(data.companyName);
          localStorage.setItem(`employee-${id}`, JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedEmployee = {
      name,
      email,
      phone,
      address,
      Designation: designation,
      Packege: packageAmount,
      companyName
    };

    fetch(`http://localhost:8000/employee/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    })
      .then((res) => res.json())
      .then(() => {
        localStorage.setItem(`employee-${id}`, JSON.stringify(updatedEmployee));
        onClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='row g-3'>
      <div className="form-group col-lg-6">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group col-lg-6">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group col-lg-6">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="form-group col-lg-6">
        <label>Designation</label>
        <input
          type="text"
          className="form-control"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />
      </div>
      <div className="form-group col-lg-6">
        <label>Package</label>
        <input
          type="text"
          className="form-control"
          value={packageAmount}
          onChange={(e) => setPackageAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-group col-lg-6">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      {/* <div className="form-group col-lg-6">
        <label>Company Name</label>
        <input
          type="text"
          className="form-control"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div> */}
      <div className="col-lg-12">
        <div className="form-group d-flex justify-content-center">
          <button className="btn btn-success px-4 my-4" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default EmpEdit;
