// pages/devices/[id].js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const DeviceDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  console.log(id);

  useEffect(() => {
    // Burada API'den cihaz detaylarını çekmek için bir API çağrısı yapabilirsiniz
    // Örneğin: GET request ile "/api/devices/${id}" endpoint'ine istek gönderilebilir
    // API çağrısını axios veya fetch ile gerçekleştirebilirsiniz

    // Örnek API çağrısı:
    fetch(`http://localhost:3232/devices/${id}`)
      .then((response) => response.json())
      .then((data) => setDevice(data))
      .catch((error) => console.error("Error fetching device details:", error));

    // Şu anki durumu simüle etmek için sabit bir veri kullanıyoruz
  }, [id]);

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8 p-4 text-black bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Device Details</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Brand:</p>
          <p>{device.brand}</p>
        </div>
        <div>
          <p className="font-semibold">Model:</p>
          <p>{device.model}</p>
        </div>
        <div>
          <p className="font-semibold">Serial Number:</p>
          <p>{device.serialNumber}</p>
        </div>
        <div>
          <p className="font-semibold">Issue Description:</p>
          <p>{device.issueDescription}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <p>{device.status}</p>
        </div>
        <div>
          <p className="font-semibold">Customer:</p>
          <p>
            {device.Customer
              ? `${device.Customer.firstName} ${device.Customer.lastName}`
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="font-semibold">Employee:</p>
          <p>
            {device.Employee
              ? `${device.Employee.firstName} ${device.Employee.lastName}`
              : "N/A"}
          </p>
        </div>
        {/* Diğer özellikleri buraya ekleyebilirsiniz */}
      </div>
    </div>
  );
};

export default DeviceDetailPage;
