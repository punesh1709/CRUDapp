


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EmpEdit() {
  const { empid } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        namechange(resp.name);
        emailchange(resp.email);
        phonechange(resp.phone);
        addresschange(resp.address);
        Designationchange(resp.Designation);
        Packegechange(resp.Packege.replace('LPA', '')); 
        activechange(resp.isactive);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [address, addresschange] = useState("");
  const [Designation, Designationchange] = useState("");
  const [Packege, Packegechange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);
  const [phoneValidationMessage, setPhoneValidationMessage] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");

  const navigate = useNavigate();

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

  const nameChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      namechange(value);
    } else {
      alert("Enter Only Character");
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (Packege < 3 || Packege > 25) {
      alert("Package must be between 3 and 25 LPA");
      return;
    }

    const empdata = {
      id,
      name,
      email,
      phone,
      address,
      Designation,
      Packege: `${Packege}LPA`,
      active,
    };

    fetch("http://localhost:8000/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2 className="text-center fw-bold text-danger">Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => nameChange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => emailChange(e.target.value)}
                        className="form-control"
                      ></input>
                      {emailValidationMessage && (
                        <div className="text-danger">{emailValidationMessage}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => phoneChange(e.target.value)}
                        className="form-control"
                      ></input>
                      {phoneValidationMessage && (
                        <div className="text-danger">{phoneValidationMessage}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        value={address}
                        onChange={(e) => addresschange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Designation</label>
                      <input
                        value={Designation}
                        onChange={(e) => Designationchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
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

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => activechange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success px-4" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger m-3 px-4">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmpEdit;
