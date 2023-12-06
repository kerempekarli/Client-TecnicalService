// pages/customers.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3232/customers");
        if (!response.ok) {
          throw new Error("API call failed");
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Customers</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">Last Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone Number</th>
            <th className="py-2 px-4 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-800">
              <td className="py-2 px-4 border">{customer.id}</td>
              <td className="py-2 px-4 border">{customer.firstName}</td>
              <td className="py-2 px-4 border">{customer.lastName}</td>
              <td className="py-2 px-4 border">{customer.email}</td>
              <td className="py-2 px-4 border">{customer.phoneNumber}</td>
              <td className="py-2 px-4 border">
                <Link href={`/customers/${customer.id}`}>
                  <div className="text-blue-500 hover:underline">Details</div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
