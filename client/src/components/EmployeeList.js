import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showPrintableView, setShowPrintableView] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/employees');
      setEmployees(res.data);
    } catch (err) {
      toast.error('Error fetching employees!');
      console.error('Error fetching employees:', err);
    }
  };

  const handlePrint = () => {
    setShowPrintableView(true);
  };

  // Consider placing <ToastContainer /> once in your top-level component (e.g., App.js)

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-indigo-400 to-indigo-200 flex flex-col items-start justify-start p-5 w-full">
      <div className="w-full max-w-7xl p-4 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-3xl shadow-lg border border-indigo-200">
        {!showPrintableView ? (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center drop-shadow-sm">
              Employee List
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="py-2 px-4 border-b border-indigo-300">Employee ID</th>
                    <th className="py-2 px-4 border-b border-indigo-300">Full Name</th>
                    <th className="py-2 px-4 border-b border-indigo-300">DOB</th>
                    <th className="py-2 px-4 border-b border-indigo-300">Address</th>
                    <th className="py-2 px-4 border-b border-indigo-300">Contact</th>
                    <th className="py-2 px-4 border-b border-indigo-300">Joining Date</th>
                    <th className="py-2 px-4 border-b border-indigo-300">Bank</th>
                    <th className="py-2 px-4 border-b border-indigo-300">Account No</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors duration-200">
                      <td className="py-2 px-4 border-b border-indigo-300">{emp.emp_id}</td>
                      <td className="py-2 px-4 border-b border-indigo-300">{emp.emp_name}</td>
                      <td className="py-2 px-4 border-b border-indigo-300">
                        {emp.emp_dob?.substring(0, 10)}
                      </td>
                      <td className="py-2 px-4 border-b border-indigo-300">{emp.emp_address}</td>
                      <td className="py-2 px-4 border-b border-indigo-300">{emp.contact_number}</td>
                      <td className="py-2 px-4 border-b border-indigo-300">
                        {emp.joining_date?.substring(0, 10)}
                      </td>
                      <td className="py-2 px-4 border-b border-indigo-300">{emp.bank_name}</td>
                      <td className="py-2 px-4 border-b border-indigo-300">{emp.account_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handlePrint}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 font-semibold"
            >
              Print
            </button>
          </>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg w-full">
            <h2 className="text-2xl font-bold text-center mb-4">Read Only Employee List</h2>
            <table className="min-w-full border border-gray-400 text-sm text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">DOB</th>
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">Contact</th>
                  <th className="border px-4 py-2">Joining</th>
                  <th className="border px-4 py-2">Bank</th>
                  <th className="border px-4 py-2">Account</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{emp.emp_id}</td>
                    <td className="border px-4 py-2">{emp.emp_name}</td>
                    <td className="border px-4 py-2">{emp.emp_dob?.substring(0, 10)}</td>
                    <td className="border px-4 py-2">{emp.emp_address}</td>
                    <td className="border px-4 py-2">{emp.contact_number}</td>
                    <td className="border px-4 py-2">{emp.joining_date?.substring(0, 10)}</td>
                    <td className="border px-4 py-2">{emp.bank_name}</td>
                    <td className="border px-4 py-2">{emp.account_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showPrintableView && (
          <button
            onClick={() => setShowPrintableView(false)}
            className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Back to Normal View
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
