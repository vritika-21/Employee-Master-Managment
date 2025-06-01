import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    emp_id: '',
    emp_name: '',
    emp_dob: '',
    emp_address: '',
    contact_number: '',
    joining_date: '',
    bank_name: '',
    account_number: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/employees', formData);
      toast.success('Employee added successfully!');
      onEmployeeAdded();
      setFormData({
         emp_id: '',
         emp_name: '',
         emp_dob: '',
         emp_address: '',
         contact_number: '',
         joining_date: '',
         bank_name: '',
         account_number: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to add employee');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-400 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full p-8 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-3xl shadow-lg border border-indigo-200">
        <h2 className="text-3xl font-extrabold text-indigo-800 text-center mb-8 tracking-wide drop-shadow-sm">
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {[
            { label: 'Employee ID', name: 'emp_id', type: 'text' },
            { label: 'Full Name', name: 'emp_name', type: 'text' },
            { label: 'Date of Birth', name: 'emp_dob', type: 'date' },
            { label: 'Address', name: 'emp_address', type: 'text' },
            { label: 'Contact Number', name: 'contact_number', type: 'tel' },
            { label: 'Date of Joining', name: 'joining_date', type: 'date' },
            { label: 'Bank Name', name: 'bank_name', type: 'text' },
            { label: 'Account Number', name: 'account_number', type: 'password' }
          ].map(({ label, name, type }) => (
            <div key={name} className="flex items-center gap-4">
              <label
                htmlFor={name}
                className="text-indigo-700 font-semibold whitespace-nowrap w-36"
              >
                {label}:
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
                className="flex-grow px-4 py-3 rounded-xl border border-indigo-300 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm 
                transition duration-300 placeholder-indigo-300"
                placeholder={
                  name === 'emp_dob'
                    ? 'Enter Date Of Birth'
                    : name === 'joining_date'
                    ? 'Enter Date Of Joining'
                    : `Enter ${label.toLowerCase()}`
                }
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 
            text-white font-semibold py-3 rounded-xl shadow-md 
            transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
