// pages/employees/index
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Burada API'den tüm çalışanları çekmek için bir API çağrısı yapabilirsiniz
    // Örneğin: GET request ile "/api/employees" endpoint'ine istek gönderilebilir
    // API çağrısını axios veya fetch ile gerçekleştirebilirsiniz

    // Örnek API çağrısı:
    fetch("http://localhost:3232/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));

    // Şu anki durumu simüle etmek için sabit bir veri kullanıyoruz
  }, []);

  return (
    <div className="container mx-auto my-8 p-4 text-black bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Employee List</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300 px-4 py-2">
                {employee.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/employees/${employee.id}`}>
                  <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesPage;
