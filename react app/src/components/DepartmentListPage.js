import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DepartmentListPage.css';
import DepartmentForm from './DepartmentForm'; 
const DepartmentListPage = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://localhost:44308/api/Department');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    try {
      // Delete the department on the server
      await axios.delete(`https://localhost:44308/api/Department/${departmentId}`);

      setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department.DepartmentId !== departmentId)
      );
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleEditDepartment = (departmentId) => {
    const department = departments.find((dept) => dept.DepartmentId === departmentId);
    setSelectedDepartment(department);
  };

  const handleAddFormClose = () => {
    setSelectedDepartment(null);
    fetchDepartments();
  };

  return (
    <div className="department-list-container">
      <h2>Department List</h2>

      {departments.length > 0 && (
        <table className="department-table">
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.DepartmentId}>
                <td>{department.DepartmentId}</td>
                <td>{department.DepartmentName}</td>
                <td>
                  <button onClick={() => handleDeleteDepartment(department.DepartmentId)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditDepartment(department.DepartmentId)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedDepartment && (
        <DepartmentForm department={selectedDepartment} onClose={handleAddFormClose} />
      )}

      
    </div>
  );
};

export default DepartmentListPage;