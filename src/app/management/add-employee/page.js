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
        navigation.push("/admin/employees");

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
    <div className="max-w-md mx-auto mt-10 p-6 text-green-500  bg-gray-600 outline-none border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add Employee</h2>
      <form>
        <label className="block mb-4">
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="employee">employee</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button
          type="button"
          onClick={handleAddEmployee}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
