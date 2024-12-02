import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const ViewEmployee = () => {
  const { id } = useParams(); // Extract the employee ID from the URL
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await API.get(`/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEmployee(response.data);
    };
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Employee Details</h2>
      <p>
        <strong>Name:</strong> {employee.firstName} {employee.lastName}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Department:</strong> {employee.department}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
    </div>
  );
};

export default ViewEmployee;
