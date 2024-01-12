import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hr/employers');
      setEmployers(response.data);
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  };

  return (
    <div>
      <h2>Employer List</h2>
      <ul>
        {employers.map((employer) => (
          <li key={employer.id}>
            {employer.name} - {employer.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployerList;
