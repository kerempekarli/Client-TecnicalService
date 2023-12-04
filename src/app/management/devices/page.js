// pages/devices.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // API'den tüm cihazları çeken bir fonksiyon kullanabilirsiniz.
    // Bu örnekte dummy data kullanıldı.
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3232/devices");
        if (!response.ok) {
          throw new Error("API call failed");
        }

        const data = await response.json();
        console.log("Devices ", data);
        setDevices(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container text-xs mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Devices</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Brand</th>
            <th className="py-2 px-4 border">Model</th>
            <th className="py-2 px-4 border">Serial Number</th>
            <th className="py-2 px-4 border">Issue Description</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Customer ID</th>
            <th className="py-2 px-4 border">Customer Name</th>
            <th className="py-2 px-4 border">Customer Email</th>
            <th className="py-2 px-4 border">Customer Phone</th>
            <th className="py-2 px-4 border">Created At</th>
            <th className="py-2 px-4 border">Updated At</th>
            <th className="py-2 px-4 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} className="hover:bg-gray-800">
              <td className="py-2 px-4 border">{device.id}</td>
              <td className="py-2 px-4 border">{device.brand}</td>
              <td className="py-2 px-4 border">{device.model}</td>
              <td className="py-2 px-4 border">{device.serialNumber}</td>
              <td className="py-2 px-4 border">{device.issueDescription}</td>
              <td className="py-2 px-4 border">{device.status}</td>
              <td className="py-2 px-4 border">{device.CustomerId}</td>
              <td className="py-2 px-4 border">{`${device.Customer.firstName} ${device.Customer.lastName}`}</td>
              <td className="py-2 px-4 border">{device.Customer.email}</td>
              <td className="py-2 px-4 border">
                {device.Customer.phoneNumber}
              </td>
              <td className="py-2 px-4 border">{device.createdAt}</td>
              <td className="py-2 px-4 border">{device.updatedAt}</td>
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
  );
};

export default DevicesPage;
