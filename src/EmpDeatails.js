import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EmpDeatails = () => {
  const { empid } = useParams();

  const [empdata, empdatachange] = useState({});

  useEffect(() => {
      fetch("http://localhost:8000/employee/" + empid).then((res) => {
          return res.json();
      }).then((resp) => {
          empdatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, []);
  return (
      <div>
        

             <div className="container">
              
          <div className="card row" style={{ "textAlign": "left" }}>
              <div className="card-title">
                  <h2 className='text-center fw-bold text-danger'>Employee Details</h2>
              </div>
              <div className="card-body"></div>

              {empdata &&
                

                <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Address</th>
      <th scope="col">Designation</th>
      <th scope="col">Packege</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{empdata.id}</th>
      <td>{empdata.name}</td>
      <td>{empdata.email}</td>
      <td>{empdata.phone}</td>
     
      <td>{empdata.address}</td>
      <td>{empdata.Designation}</td>
      <td>{empdata.Packege}</td>
    </tr>

    <Link className="btn btn-danger p-2 m-3" to="/">Back to Listing</Link>
    
  </tbody>
</table>
              }
          </div>
          </div>
          {/* </div>
          </div> */}
      </div >
  );
}

export default EmpDeatails