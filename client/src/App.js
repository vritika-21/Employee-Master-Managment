import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const [reload, setReload] = useState(false);

  const handleEmployeeAdded = () => {
    setReload(!reload); 
  };

  return (
    <div className="App">
     <h1 className="text-4xl font-extrabold bg-indigo-500 text-indigo-50 text-center 
      tracking-wide drop-shadow-lg px-8 py-4">
  Employee Master Management
</h1>


      <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
      <EmployeeList key={reload} />
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}

export default App;
