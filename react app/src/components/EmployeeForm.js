import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = ({ employee: initialEmployee, onClose }) => {
  const [employee, setEmployee] = useState({ ...initialEmployee });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

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

  const handleFormClose = () => {
    setEmployee({});
    onClose();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const isNewEmployee = !employee.EmployeeId;

      if (
        !employee.FirstName ||
        !employee.LastName ||
        !employee.Email ||
        !employee.DateOfBirth ||
        !employee.Salary ||
        !employee.Department
      ) {
        setError('Please fill in all fields.');
        return;
      }

      const data = {
        EmployeeId: employee.EmployeeId,
        FirstName: employee.FirstName,
        LastName: employee.LastName,
        Email: employee.Email,
        DateOfBirth: employee.DateOfBirth,
        Age: calculateAge(employee.DateOfBirth),
        Salary: parseInt(employee.Salary),
        Department: parseInt(employee.Department),
      };

      if (isNewEmployee) {
        await axios.post('https://localhost:44308/api/Employee', data);
      } else {
        await axios.put(`https://localhost:44308/api/Employee/${employee.EmployeeId}`, data);
      }

      handleFormClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>
      <h2>{employee.EmployeeId ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleFormSubmit}>
        {error && <div className="error-message">{error}</div>}

        <label>
          First Name:
          <input
            type="text"
            name="FirstName"
            value={employee.FirstName || ''}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="LastName"
            value={employee.LastName || ''}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={employee.Email || ''}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="DateOfBirth"
            value={employee.DateOfBirth || ''}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Age:
          <input type="text" value={calculateAge(employee.DateOfBirth)} disabled />
        </label>

        <label>
          Salary:
          <input
            type="number"
            name="Salary"
            value={employee.Salary || ''}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Department:
          <select
            name="Department"
            value={employee.Department || ''}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((department) => (
              <option key={department.DepartmentId} value={department.DepartmentId}>
                {department.DepartmentName}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving Changes...' : 'Save Changes'}
        </button>
        <button type="button" onClick={handleFormClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;

