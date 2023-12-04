// components/AddEmployeeModal.js
import { useState } from "react";

const AddEmployeeModal = ({ onClose, onEmployeeAdded }) => {
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    repassword: "",
    role: "staff", // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (employeeData.password !== employeeData.repassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3232/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        console.error("Failed to add employee");
        return;
      }

      const addedEmployee = await response.json();
      onEmployeeAdded(addedEmployee);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">First Name:</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="firstName"
              value={employeeData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Last Name:</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="lastName"
              value={employeeData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Email:</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Phone Number:</label>
            <input
              type="tel"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="phoneNumber"
              value={employeeData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Role:</label>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="role"
              value={employeeData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Password:</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="password"
              value={employeeData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">
              Re-enter Password:
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="repassword"
              value={employeeData.repassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray active:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
