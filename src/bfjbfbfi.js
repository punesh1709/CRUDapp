import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmpListing() {
  const navigate = useNavigate();
  const [empdata, setEmpdata] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const [packageSortOrder, setPackageSortOrder] = useState("asc"); // State for package sorting

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
  };

  const handlePackageSort = () => {
    const newPackageOrder = packageSortOrder === "asc" ? "desc" : "asc";
    setPackageSortOrder(newPackageOrder);
  };

  const sortedData = empdata
    ? [...empdata].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        } else {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }
      })
    : [];

  const sortedByPackage = sortedData.sort((a, b) => {
    const packageA = parseInt(a.Packege, 10);
    const packageB = parseInt(b.Packege, 10);

    if (packageSortOrder === "asc") {
      return packageA - packageB;
    } else {
      return packageB - packageA;
    }
  });

  const filteredData = sortedByPackage.filter((item) =>
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
      <div className="card">
        <div className="card-title">
          <h2 className="d-flex justify-content-center fw-bold ">Employee List</h2>
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
            <button
              className="btn btn-secondary ml-2"
              onClick={handlePackageSort}
              style={{ marginTop: "10px" }}
            >
              Sort Package {packageSortOrder === "asc" ? "Low to High" : "High to Low"}
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
                <th>Packege</th>
                <th className="text-center">Action</th>
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
                  <td className="d-flex justify-content-center">
                    <button
                      onClick={() => LoadEdit(item.id)}
                      className="btn btn-success mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => RemoveFunction(item.id)}
                      className="btn btn-danger mx-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => LoadDeatails(item.id)}
                      className="btn btn-primary mx-2"
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
