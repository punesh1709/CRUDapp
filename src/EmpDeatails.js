// import React, { useEffect, useState } from 'react';

// const EmpDetails = ({ id }) => {
//   const [empdata, setEmpdata] = useState({});

//   useEffect(() => {
//     fetch(`http://localhost:8000/employee/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setEmpdata(data);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, [id]);

//   return (
//     <div>
//       <div className="container">
//         <div className="card row" style={{ textAlign: 'left' }}>
//           <div className="card-title">
//             <h2 className='text-center fw-bold text-danger'>Employee Details</h2>
//           </div>
//           <div className="card-body"></div>
//           {empdata && (
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th scope="col">ID</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Email</th>
//                   <th scope="col">Phone</th>
//                   <th scope="col">Address</th>
//                   <th scope="col">Designation</th>
//                   <th scope="col">Package</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <th scope="row">{empdata.id}</th>
//                   <td>{empdata.name}</td>
//                   <td>{empdata.email}</td>
//                   <td>{empdata.phone}</td>
//                   <td>{empdata.address}</td>
//                   <td>{empdata.Designation}</td>
//                   <td>{empdata.Packege}</td>
//                 </tr>
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmpDetails;


// import React, { useEffect, useState } from 'react';
// import './EmpDetails.css'; // Import the CSS file

// const EmpDetails = ({ id }) => {
//   const [empdata, setEmpdata] = useState({});

//   useEffect(() => {
//     fetch(`http://localhost:8000/employee/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setEmpdata(data);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, [id]);

//   return (
//     <div className="containers">
//       <div className="cards">
//         <div className="card-titles">
//           <h2 className='text-center fw-bold text-danger'>Employee Details</h2>
//         </div>
//         {empdata && (
//           <div className="card-body">
//             <div className="detail">
//               <span className="detail-label">ID:</span>
//               <span className="detail-value">{empdata.id}</span>
//             </div>
//             <div className="detail">
//               <span className="detail-label">Name:</span>
//               <span className="detail-value">{empdata.name}</span>
//             </div>
//             <div className="detail">
//               <span className="detail-label">Email:</span>
//               <span className="detail-value">{empdata.email}</span>
//             </div>
//             <div className="detail">
//               <span className="detail-label">Phone:</span>
//               <span className="detail-value">{empdata.phone}</span>
//             </div>
//             <div className="detail">
//               <span className="detail-label">Address:</span>
//               <span className="detail-value">{empdata.address}</span>
//             </div>
//             <div className="detail">
//               <span className="detail-label">Designation:</span>
//               <span className="detail-value">{empdata.Designation}</span>
//             </div>
//             <div className="detail">
//               <span className="detail-label">Package:</span>
//               <span className="detail-value">{empdata.Packege}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmpDetails;




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
