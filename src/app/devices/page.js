// pages/devices.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "react-modal";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cihazları çekmek için API çağrısı
    const fetchDevices = async () => {
      try {
        const devicesResponse = await fetch("http://localhost:3232/devices");
        if (!devicesResponse.ok) {
          throw new Error("Error fetching devices");
        }
        const devicesData = await devicesResponse.json();
        setDevices(devicesData);
        console.log(devicesData);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    // Çalışanları çekmek için API çağrısı
    const fetchEmployees = async () => {
      try {
        const employeesResponse = await fetch(
          "http://localhost:3232/employees"
        );
        if (!employeesResponse.ok) {
          throw new Error("Error fetching employees");
        }
        const employeesData = await employeesResponse.json();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchDevices();
    fetchEmployees();
  }, []);

  const handleAssignClick = (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedDevice(null);
    setIsModalOpen(false);
  };

  const handleEmployeeSelect = async (employee) => {
    try {
      // Seçilen çalışanın ID'sini al
      const employeeId = employee.id;

      // Seçilen cihazın ID'sini al
      const deviceId = selectedDevice.id;

      // API'ye PATCH isteği yaparak cihazı seçilen çalışana ata
      const response = await fetch(
        `http://localhost:3232/devices/${deviceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Burada güncellenmesini istediğiniz alanları belirleyebilirsiniz
            // Örneğin, employeeId gibi
            EmployeeId: employeeId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating device");
      }

      // Cihazı atan çalışanı güncelleme işlemi başarılı ise state'i güncelle
      setDevices((prevDevices) => {
        return prevDevices.map((device) => {
          if (device.id === deviceId) {
            // Eğer sadece employeeId'yi güncellemek istiyorsanız, aşağıdaki gibi yapabilirsiniz
            // Ancak bu, API'nin dönüş değerine ve güncelleme stratejinize bağlıdır
            return {
              ...device,
              employeeId: employeeId,
            };
          }
          return device;
        });
      });

      // Başarılı güncelleme mesajı
      console.log("Device updated successfully");
    } catch (error) {
      console.error("Error updating device:", error);
    } finally {
      // Modal'ı kapat
      handleModalClose();
    }
  };

  return (
    <div className="container mx-auto my-8 p-4  text-black bg-white shadow-lg rounded-lg ">
      <h1 className="text-3xl font-bold mb-4">Devices</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Brand</th>
            <th className="border border-gray-300 px-4 py-2">Model</th>
            <th className="border border-gray-300 px-4 py-2">Serial Number</th>
            <th className="border border-gray-300 px-4 py-2">
              Issue Description
            </th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Customer</th>
            <th className="border border-gray-300 px-4 py-2">Employee</th>
            <th className="border border-gray-300 px-4 py-2">Detail</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td className="border border-gray-300 px-4 py-2">{device.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {device.brand}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.model}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.serialNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.issueDescription}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.Customer
                  ? `${device.Customer.firstName} ${device.Customer.lastName}`
                  : "N/A"}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {device.Employee ? (
                  `${device.Employee.firstName} ${device.Employee.lastName}`
                ) : (
                  <button
                    onClick={() => handleAssignClick(device)}
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Assign
                  </button>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/devices/${device.id}`}>
                  {" "}
                  <button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded">
                    Detail
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        ariaHideApp={false}
        onRequestClose={handleModalClose}
        contentLabel="Assign Employee Modal"
        className="modal absolute inset-0 backdrop-blur-sm	flex justify-center 	min-h-screen z-10 text-black"
        overlayClassName="overlay"
      >
        <div className="xl:mt-44">
          <div className=" bg-gray-900 bg-opacity-50 backdrop-blur-md"></div>
          <div className="z-10 relative max-w-screen-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Assign Employee</h2>
            <ul>
              {employees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => handleEmployeeSelect(employee)}
                  className="block w-full p-2 text-left border-b bg-blue-400 text-white rounded-lg border-blue-300"
                >
                  {employee.firstName} {employee.lastName}
                </button>
              ))}
            </ul>
            <button
              onClick={handleModalClose}
              className="mt-4 bg-gray-200 p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DevicesPage;
