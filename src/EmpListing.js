
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmpListing() {
  const navigate = useNavigate();
  const [empdata, setEmpdata] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortPackageOrder, setSortPackageOrder] = useState(null); // Changed to null
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

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

  const LoadDetails = (id) => {
    navigate(`/employee/detail/${id}`);
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
    setSortPackageOrder(null); // Reset package sort order
  };

  const handleSortPackage = () => {
    const newOrder = sortPackageOrder === "asc" ? "desc" : "asc";
    setSortPackageOrder(newOrder);
    setSortOrder(null); // Reset name sort order
  };

  const sortedData = empdata
    ? [...empdata].sort((a, b) => {
        if (sortPackageOrder) {
          const packageA = parseFloat(a.Packege);
          const packageB = parseFloat(b.Packege);
          if (sortPackageOrder === "asc") {
            return packageA - packageB;
          } else {
            return packageB - packageA;
          }
        } else {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (sortOrder === "asc") {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        }
      })
    : [];

  const filteredData = sortedData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <div className="card  w-100">
        <div className="card-title">
          <h2 className="d-flex justify-content-center fw-bold text-danger">Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <div className="d-flex justify-content-between flex-row-reverse">
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
              className="btn btn-secondary m-2"
              onClick={handleSort}
              style={{ marginTop: "10px" }}
            >
              Sort Name {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
            <button
              className="btn btn-secondary m-2"
              onClick={handleSortPackage}
              style={{ marginTop: "10px" }}
            >
              Sort Package {sortPackageOrder === "asc" ? "High-Low" : "Low-High"}
            </button>
            </div>
          </div>
          <table className="table table-bordered ">
            <thead className=" text-white">
              <tr>
                <th className="bg-black text-white"> ID</th>
                <th className="bg-black text-white">Name</th>
                <th className="bg-black text-white">Email</th>
                <th className="bg-black text-white">Phone</th>
                <th className="bg-black text-white">Address</th>
                <th className="bg-black text-white">Designation</th>
                <th className="bg-black text-white">Packege</th>
                <th className="text-center bg-black text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.Designation}</td>
                  <td>{item.Packege}</td>
                  <td className="d-flex justify-content-evenly">
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
                      onClick={() => LoadDetails(item.id)}
                      className="btn btn-primary"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpListing;
