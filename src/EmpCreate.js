
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmpCreate() {
  const[id,idchange]=useState("");
  const[name,namechange]=useState("");
  const[email,emailchange]=useState("");
  const[phone,phonechange]=useState("");
  const[address,addresschange]=useState("");
  const[Designation,Designationchange]=useState("");
  const[Packege,Packegechange]=useState("");
  // const [packageValue, setPackageValue] = useState("");
  const navigate=useNavigate();
  // const[validation,valchange]=useState(false);
 const onHandleSubmit = (e)=>{
  e.preventDefault();
  const empdata={name,email,phone,address,address,Designation,Packege};
      

      fetch("http://localhost:8000/employee",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })
 }


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
                  <input value={id} disabled="disabled" className="form-control"></input>
                </div>
                
                </div>
   {/* 111 */}
                <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input value={name} onChange={(e)=>namechange(e.target.value)} className="form-control"></input>
                </div>
                </div>


                {/* 222 */}

                <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input value={email} onChange={(e)=>emailchange(e.target.value)} className="form-control"></input>
                </div>
                </div>


                {/* 333 */}
                <div className="col-lg-12">
                <div className="form-group">
                  <label>Phone</label>
                  <input value={phone} onChange={(e)=>phonechange(e.target.value)} className="form-control"></input>
                </div>
                </div>

                 {/* 333 */}
                 <div className="col-lg-12">
                <div className="form-group">
                  <label>Address</label>
                  <input value={address} onChange={(e)=>addresschange(e.target.value)} className="form-control"></input>
                </div>
                </div>

                 {/* 333 */}
                 <div className="col-lg-12">
                <div className="form-group">
                  <label>Designation</label>
                  <input value={Designation} onChange={(e)=>Designationchange(e.target.value)} className="form-control"></input>
                </div>
                </div>

                 {/* 333 */}
                 <div className="col-lg-12">
                <div className="form-group">
                  <label>Packege</label>
                  <input value={Packege} onChange={(e)=>Packegechange(e.target.value)} className="form-control"></input>
                </div>
                </div>
    {/* button */}
                <div className="col-lg-12">
                <div className="form-group">
                  <button className="btn btn-success" type="submit">Save</button>
                  <Link to="/" className="btn btn-danger">Back</Link>
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