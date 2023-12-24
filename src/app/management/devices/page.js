// pages/devices.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

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
  const updateDeviceStatus = async () => {
    try {
      if (!selectedStatus || !selectedDevice) {
        throw new Error("Status or device not selected");
      }

      // Burada API'ye PATCH isteği yaparak cihazın durumunu güncelleyebilirsiniz
      const response = await fetch(
        `http://localhost:3232/devices/${selectedDevice.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Burada güncellenmesini istediğiniz alanları belirleyebilirsiniz
            // Örneğin, status gibi
            status: selectedStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating device status");
      }

      // Başarılı güncelleme mesajı
      console.log("Device status updated successfully");

      // Güncellenen cihaz verilerini almak için tüm cihazları tekrar çekin
      fetchData();
    } catch (error) {
      console.error("Error updating device status:", error);
    } finally {
      // Modal'ı kapat
      setIsModalOpen(false);
      // Seçilen durumu ve cihazı sıfırla
      setSelectedStatus(null);
      setSelectedDevice(null);
    }
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };
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
            <th className="py-2 px-4 border">Action</th>
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
                <button
                  onClick={() => {
                    setSelectedDevice(device);
                    setIsModalOpen(true);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded"
                >
                  Update Status
                </button>
              </td>
              <td className="py-2 px-4 border">
                <Link href={`/devices/${device.id}`}>
                  <div className="text-blue-500 font-bold   hover:underline">
                    Details 
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 text-xl flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-[400px]">
            <h2 className="text-xl font-bold mb-4">Select Status</h2>
            <ul>
              {["Pending", "In Progress", "Completed"].map((status) => (
                <li key={status} className="mb-2">
                  <button
                    onClick={() => handleStatusSelect(status)}
                    className={`bg-blue-500 hover:bg-blue-700 w-full text-white  py-2 px-4 rounded ${
                      selectedStatus === status ? "bg-blue-700" : ""
                    }`}
                  >
                    {status}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={updateDeviceStatus}
              className="mt-4 bg-green-500 inline-block  hover:bg-green-700 text-white  py-2 px-4 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-600 p-2 rounded-md ml-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevicesPage;
