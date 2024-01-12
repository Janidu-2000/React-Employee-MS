
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeListPage.css';
import EmployeeForm from './EmployeeForm';

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:44308/api/Employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://localhost:44308/api/Employee/GetAllDepartmentNames');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      // Delete the employee on the server
      await axios.delete(`https://localhost:44308/api/Employee/${employeeId}`);
      
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.EmployeeId !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditEmployee = (employeeId) => {
    const employee = employees.find((employee) => employee.EmployeeId === employeeId);
    setSelectedEmployee(employee);
  };

  const handleAddFormClose = () => {
    setSelectedEmployee(null);
    fetchEmployees();
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept.DepartmentId === departmentId);
    return department ? department.DepartmentName : '';
  };

  const handleAddEmployee = async (employee) => {
    try {
      await axios.post('https://localhost:44308/api/Employee', employee);
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>

      {employees.length > 0 && (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.EmployeeId}>
                <td>{employee.EmployeeId}</td>
                <td>{employee.FirstName}</td>
                <td>{employee.LastName}</td>
                <td>{employee.Email}</td>
                <td>{employee.DateOfBirth}</td>
                <td>{calculateAge(employee.DateOfBirth)}</td>
                <td>Rs.{employee.Salary}.00</td>
                <td>{employee.DepartmentName}</td>
                <td>
                  <button onClick={() => handleDeleteEmployee(employee.EmployeeId)}>Delete</button>
                  <button onClick={() => handleEditEmployee(employee.EmployeeId)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedEmployee && (
        <EmployeeForm employee={selectedEmployee} onClose={handleAddFormClose} />
      )}

      {/* <button onClick={() => setSelectedEmployee({})}>Add Employee</button> */}
    </div>
  );
};

export default EmployeeListPage;
