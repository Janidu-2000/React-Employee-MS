import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DepartmentForm from './components/DepartmentForm';
import EmployeeForm from './components/EmployeeForm';
import EmployeeListPage from './components/EmployeeListPage';
import DepartmentListPage from './components/DepartmentListPage';

function App() {
  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 9.5px',
    margin: '5px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: 'darkblue',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    
  };
  

  return (
    <Router>
      <div>
        <nav><hr />
          
              <Link to="/department" style={buttonStyle}>
                Add Department
              </Link>

              <Link to="/department-list" style={buttonStyle}>
                Department List
              </Link>
            
              <Link to="/employee" style={buttonStyle}>
                Add Employee
              </Link>
            
              <Link to="/employee-list" style={buttonStyle}>
                Employee List
              </Link>
            
        </nav>

        <hr />

        <Routes>
          <Route path="/department" element={<DepartmentForm />} />
          <Route path="/department-list" element={<DepartmentListPage />} />
          <Route path="/employee" element={<EmployeeForm />} />
          <Route path="/employee-list" element={<EmployeeListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
