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
            <label htmlFor="inputEmail4">Name</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={empdata.name} />
          </div>
          <div className="form-group col-md-6 px-2">
            <label htmlFor="inputPassword4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={empdata.email} />
          </div>
        </div>


        <div className="form-row d-flex p-2">
          <div className="form-group col-md-4 px-2">
            <label htmlFor="inputCity">Phone</label>
            <input type="text" className="form-control" value={empdata.phone} />
          </div>
       
        
          <div className="form-group col-md-4 px-2">
            <label htmlFor="inputCity">Designation</label>
            <input type="text" className="form-control" value={empdata.Designation} />
          </div>
       
       
          <div className="form-group col-md-4 px-2">
            <label htmlFor="inputCity">Package</label>
            <input type="text" className="form-control" value={empdata.Packege} />
          </div>
          </div>
       
        <div className="form-group px-2">
          <label htmlFor="inputAddress">Address</label>
          <input type="text" className="form-control" value={empdata.address} />
        </div>

      </form>

    </>
  );
};

export default EmpDetails;
