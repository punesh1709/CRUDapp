


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmpCreate({ onClose }) {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [address, addresschange] = useState("");
  const [Designation, Designationchange] = useState("");
  const [Packege, Packegechange] = useState("");
  const [phoneValidationMessage, setPhoneValidationMessage] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [addressValidationMessage, setAddressValidationMessage] = useState("");
  const [companyName, setCompanyName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedCompanyData = JSON.parse(localStorage.getItem('companyData'));
    if (storedCompanyData) {
      setCompanyName(storedCompanyData.companyName);
    }
  }, []);

  const phoneChange = (value) => {
    const digitOnlyValue = value.replace(/\D/g, "");
    if (digitOnlyValue.length <= 10) {
      phonechange(digitOnlyValue);
      validatePhone(digitOnlyValue);
    }
  };

  const validatePhone = (phone) => {
    if (phone.length !== 10) {
      setPhoneValidationMessage("Phone number must be 10 digits");
    } else {
      setPhoneValidationMessage("");
    }
  };

  const packageChange = (value) => {
    const packageValue = parseInt(value, 10);
    Packegechange(packageValue);
  };

  const emailChange = (value) => {
    if (/^\d/.test(value)) {
      setEmailValidationMessage("Email cannot start with a digit");
    } else {
      setEmailValidationMessage("");
      emailchange(value);
    }
  };

  const addressChange = (value) => {
    if (value.length > 150) {
      setAddressValidationMessage("Address cannot exceed 150 characters");
    } else if (value.length === 0) {
      setAddressValidationMessage("Address cannot be empty");
    } else {
      setAddressValidationMessage("");
      addresschange(value);
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name) {
      alert("Name cannot be empty");
      return;
    }

    if (!email) {
      alert("Email cannot be empty");
      return;
    }

    if (emailValidationMessage) {
      alert("Invalid email format");
      return;
    }

    if (!phone) {
      alert("Phone cannot be empty");
      return;
    }

    if (phoneValidationMessage) {
      alert("Invalid phone number");
      return;
    }

    if (!address) {
      alert("Address cannot be empty");
      return;
    }

    if (addressValidationMessage) {
      alert("Invalid address format");
      return;
    }

    if (Packege < 3 || Packege > 25) {
      alert("Package must be between 3 and 25 LPA");
      return;
    }

    const empdata = {
      name,
      email,
      phone,
      address,
      Designation,
      Packege: `${Packege}LPA`,
      companyName,
      password: "12345678" // Default password
    };

    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
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
    <div>
      <div className="">
        <form className="container row g-3" onSubmit={onHandleSubmit}>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    namechange(value);
                  } else {
                    alert("Enter Only Character");
                  }
                }}
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => emailChange(e.target.value)}
                className="form-control"
              ></input>
              {emailValidationMessage && (
                <div className="text-danger">{emailValidationMessage}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={phone}
                required
                onChange={(e) => phoneChange(e.target.value)}
                className="form-control"
              />
              {phoneValidationMessage && (
                <div className="text-danger">{phoneValidationMessage}</div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <label>Designation</label>
              <input
                value={Designation}
                required
                onChange={(e) => Designationchange(e.target.value)}
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Package</label>
              <input
                type="number"
                value={Packege}
                onChange={(e) => packageChange(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Address</label>
              <input
                value={address}
                required
                onChange={(e) => addressChange(e.target.value)}
                className="form-control"
              ></input>
              {addressValidationMessage && (
                <div className="text-danger">{addressValidationMessage}</div>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group d-flex justify-content-center">
              <button className="btn btn-success px-4 my-4" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmpCreate;
