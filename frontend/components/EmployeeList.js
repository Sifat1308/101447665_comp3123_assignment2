import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await API.get("/employees", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  const handleSearch = async () => {
    const response = await API.get(`/employees/search?query=${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setEmployees(response.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search by department or position"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>
                {emp.firstName} {emp.lastName}
              </td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>
                <Link to={`/edit-employee/${emp._id}`} className="btn btn-sm btn-warning me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={async () => {
                    await API.delete(`/employees/${emp._id}`, {
                      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    });
                    setEmployees(employees.filter((e) => e._id !== emp._id));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-employee" className="btn btn-primary mt-3">
        Add Employee
      </Link>
    </div>
  );
};

export default EmployeeList;
