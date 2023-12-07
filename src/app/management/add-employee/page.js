// pages/admin/add-employee.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {
  const navigation = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const handleAddEmployee = async () => {
    try {
      const response = await fetch(
        "http://localhost:3232/auth/register/employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            role,
          }),
        }
      );

      if (response.ok) {
        // Başarılı ekleme durumunda yönlendirme yapılabilir
        navigation.push(" /employees");

        // Başarı durumu için Toastify bildirimi
        toast.success("Employee added successfully");
      } else {
        console.error("Employee addition failed:", await response.text());
        toast.error("Employee addition failed");
      }
    } catch (error) {
      console.error("An error occurred while adding employee:", error);
      toast.error("An error occurred while adding employee");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 text-black bg-gray-800 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-green-500 mb-6">
        Add Employee
      </h2>
      <form className="space-y-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-white mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-white mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-white mb-2">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-white mb-2">
            Role:
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleAddEmployee}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
