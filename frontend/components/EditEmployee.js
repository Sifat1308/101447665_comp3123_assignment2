import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const EditEmployee = () => {
  const { id } = useParams(); // Extract the employee ID from the URL
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await API.get(`/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFormData(response.data);
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/employees/${id}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate("/employees");
  };

  return (
    <div className="container mt-4">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
