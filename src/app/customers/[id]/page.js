"use client";
// pages/customers/[id].js
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const CustomerDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [customer, setCustomer] = useState(null);





  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:3232/customers/${id}`);
        if (!response.ok) {
          throw new Error("API call failed");
        }

        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Customer Detail</h1>
      <div className="mb-4">
        <strong>First Name:</strong> {customer.firstName}
      </div>
      <div className="mb-4">
        <strong>Last Name:</strong> {customer.lastName}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {customer.email}
      </div>
      <div className="mb-4">
        <strong>Phone Number:</strong> {customer.phoneNumber}
      </div>
      <div className="mb-4">
        <strong>Devices:</strong>
        <table className="w-full border">
          <thead>
            <tr className="bg-black text-white">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Brand</th>
              <th className="py-2 px-4 border">Model</th>
              <th className="py-2 px-4 border">Serial Number</th>
              <th className="py-2 px-4 border">Issue Description</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {customer.Devices.map((device) => (
              <tr key={device.id} className="hover:bg-gray-800">
                <td className="py-2 px-4 border">{device.id}</td>
                <td className="py-2 px-4 border">{device.brand}</td>
                <td className="py-2 px-4 border">{device.model}</td>
                <td className="py-2 px-4 border">{device.serialNumber}</td>
                <td className="py-2 px-4 border">{device.issueDescription}</td>
                <td className="py-2 px-4 border">{device.status}</td>
                <td className="py-2 px-4 border">
                  <Link href={`/devices/${device.id}`}>
                    <div className="text-blue-500 hover:underline">Details</div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <Link href="/customers">
          <div className="text-blue-500 hover:underline">Back to Customers</div>
        </Link>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
