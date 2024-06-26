

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// function EmpListing() {
//   const navigate = useNavigate();
//   const [empdata, setEmpdata] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8000/employee")
//       .then((res) => res.json())
//       .then((resp) => {
//         setEmpdata(resp);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, []);

//   const LoadDeatails = (id) => {
//     navigate(`/employee/details/${id}`);
//   };

//   const RemoveFunction = (id) => {
//     if (window.confirm("Do you want to remove?")) {
//       fetch(`http://localhost:8000/employee/${id}`, {
//         method: "DELETE",
//       })
//         .then((res) => {
//           alert("Removed successfully.");
//           // Optionally update state or re-fetch data
//           // setEmpdata(empdata.filter(item => item.id !== id));
//           window.location.reload(); // Temporary solution, consider alternatives
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     }
//   };

//   const LoadEdit = (id) => {
//     navigate(`/employee/edit/${id}`);
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredData = empdata
//     ? empdata.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="container">
//       <div className="card">
//         <div className="card-title">
//           <h2>Employee Listing</h2>
//         </div>
//         <div className="card-body">
//           <div className="mb-3">
//             <Link to="/employee/create" className="btn btn-success">
//               Add New (+)
//             </Link>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by name"
//               value={searchQuery}
//               onChange={handleSearch}
//               style={{ marginTop: "10px", width: "300px" }}
//             />
//           </div>
//           <table className="table table-bordered">
//             <thead className="bg-dark text-white">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//                 <th>Designation</th>
//                 <th>Packege</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData &&
//                 filteredData.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.name}</td>
//                     <td>{item.email}</td>
//                     <td>{item.phone}</td>
//                     <td>{item.Address}</td>
//                     <td>{item.Designation}</td>
//                     <td>{item.Packege}</td>
//                     <td>
//                       <button
//                         onClick={() => LoadEdit(item.id)}
//                         className="btn btn-success"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => RemoveFunction(item.id)}
//                         className="btn btn-danger"
//                       >
//                         Remove
//                       </button>
//                       <button
//                         onClick={() => LoadDeatails(item.id)}
//                         className="btn btn-primary"
//                       >
//                         Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmpListing;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmpListing() {
  const navigate = useNavigate();
  const [empdata, setEmpdata] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Track sorting order

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => res.json())
      .then((resp) => {
        setEmpdata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const LoadDeatails = (id) => {
    navigate(`/employee/details/${id}`);
  };

  const RemoveFunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(`http://localhost:8000/employee/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload(); // Temporary solution, consider alternatives
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const LoadEdit = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  // Function to sort data by name based on current sortOrder
  const sortedData = empdata
    ? [...empdata].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      })
    : [];

  // Filter and sorted data based on search query and sortOrder
  const filteredSortedData = sortedData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="text-center">Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <Link to="/employee/create" className="btn btn-success">
              Add New (+)
            </Link>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginTop: "10px", width: "300px" }}
            />
            <button
              className="btn btn-secondary ml-2"
              onClick={handleSort}
              style={{ marginTop: "10px" }}
            >
              Sort Name {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Designation</th>
                <th>Package</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSortedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.Address}</td>
                  <td>{item.Designation}</td>
                  <td>{item.Packege}</td>
                  <div className="d-flex justify-content-evenly">
                    <button
                      onClick={() => LoadEdit(item.id)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => RemoveFunction(item.id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => LoadDeatails(item.id)}
                      className="btn btn-primary"
                    >
                      Details
                    </button>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmpListing;
