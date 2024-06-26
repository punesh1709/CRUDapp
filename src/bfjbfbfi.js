import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmpCreate() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing employees to determine the next ID
    fetch("http://localhost:8000/employee")
      .then((res) => res.json())
      .then((data) => {
        const nextId = data.length > 0 ? Math.max(...data.map(emp => emp.id)) + 1 : 1;
        setId(nextId);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const empdata = { id, name, email, phone };

    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={onHandleSubmit}>
          <div className="card">
            <div className="card-title">
              <h2>Employee Create</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>ID</label>
                    <input value={id} disabled className="form-control" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <button className="btn btn-success" type="submit">
                      Save
                    </button>
                    <Link to="/" className="btn btn-danger">
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
  );
}

export default EmpCreate;
