import React, { useEffect, useState } from 'react';
import './EmpDetails.css'; // Import the CSS file

const EmpDetails = ({ id }) => {
  const [empdata, setEmpdata] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/employee/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmpdata(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  return (
    <>
      <form>
        <div className="form-row d-flex p-2">
          <div className="form-group col-md-6 px-2">
            <h6
             className='px-2'>Name</h6>
            <p className='border rounded p-2'>{empdata.name}</p>
          </div>
          <div className="form-group col-md-6 px-2">
            <h6 className='px-2'>Email</h6>
            <p className='border rounded p-2'>{empdata.email}</p>
          </div>
        </div>


        <div className="form-row d-flex p-2">
          <div className="form-group col-md-6 px-2">
            <h6 className='px-2'>Phone</h6>
           <p className='border rounded p-2'>{empdata.phone}</p>
          </div>


          <div className="form-group col-md-6 px-2">
            <h6 className='px-2'>Designation</h6>
            <p className='border rounded p-2'>{empdata.Designation} </p>
          </div>



        </div>

        <div className="form-row d-flex p-2">
          <div className="form-group col-md-6 px-2">
            <h6 className='px-2'>Package</h6>
            <p className='border rounded p-2'>{empdata.Packege}</p>
          </div>
          <div className="form-group col-md-6 px-2">
            <h6 className='px-2' >Address</h6>
            <p className='border rounded p-2'>{empdata.address}</p>
          </div>
        </div>
      </form>

    </>
  );
};

export default EmpDetails;

