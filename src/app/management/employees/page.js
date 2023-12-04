// pages/employees.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddEmployeeModal from "../../../components/AddEmployeesModal";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const openAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const closeAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  const handleEmployeeAdded = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    closeAddEmployeeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3232/employees");
        if (!response.ok) {
          throw new Error("API call failed");
        }

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isAddEmployeeModalOpen]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Employees</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        onClick={openAddEmployeeModal}
      >
        Yeni Ekle
      </button>
      <table className="w-full border">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">Last Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone Number</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-800">
              <td className="py-2 px-4 border">{employee.id}</td>
              <td className="py-2 px-4 border">{employee.firstName}</td>
              <td className="py-2 px-4 border">{employee.lastName}</td>
              <td className="py-2 px-4 border">{employee.email}</td>
              <td className="py-2 px-4 border">{employee.phoneNumber}</td>
              <td className="py-2 px-4 border">{employee.role}</td>
              <td className="py-2 px-4 border">
                <Link href={`/employees/${employee.id}`}>
                  <div className="text-blue-500 hover:underline">Details</div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddEmployeeModalOpen && (
        <AddEmployeeModal
          onClose={closeAddEmployeeModal}
          onEmployeeAdded={handleEmployeeAdded}
        />
      )}
    </div>
  );
};

export default EmployeesPage;
