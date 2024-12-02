import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/employees", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate("/employees");
  };

  return (
    <div className="container mt-4">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
