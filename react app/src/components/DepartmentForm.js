import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DepartmentForm.css';

const DepartmentForm = ({ department: initialDepartment, onClose }) => {
  const [department, setDepartment] = useState({ ...initialDepartment });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialDepartment) {
      setDepartment({ ...initialDepartment });
    }
  }, [initialDepartment]);

  const handleInputChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleFormClose = () => {
    setDepartment({});
    onClose();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const isNewDepartment = !department.DepartmentId;

      if (!department.DepartmentName) {
        setError('Please fill in the department name.');
        return;
      }

      const data = {
        DepartmentId: department.DepartmentId,
        DepartmentName: department.DepartmentName,
      };

      if (isNewDepartment) {
        await axios.post('https://localhost:44308/api/Department', data);
      } else {

        await axios.put(`https://localhost:44308/api/Department/${department.DepartmentId}`, data);

      }

      handleFormClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      setLoading(true);
      setError(null);


      await axios.delete(`https://localhost:44308/api/Department/${department.DepartmentId}`);

      handleFormClose();
    } catch (error) {
      console.error('Error deleting department:', error);
      setError('An error occurred while deleting. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{department.DepartmentId ? 'Edit Department' : 'Add Department'}</h2>
      <form onSubmit={handleFormSubmit}>
        {error && <div className="error-message">{error}</div>}

        <label>
          Department Name:
          <input
            type="text"
            name="DepartmentName"
            value={department.DepartmentName || ''}
            onChange={handleInputChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving Changes...' : 'Save Changes'}
        </button>
        
        {/* <button type="button" onClick={handleFormClose}>
          Cancel
        </button> */}


        {department.DepartmentId && (
          <button type="button" onClick={handleDeleteDepartment} disabled={loading}>
            {loading ? 'Deleting Department...' : 'Delete Department'}
          </button>
        )}
      </form>
    </div>
  );
};

export default DepartmentForm;