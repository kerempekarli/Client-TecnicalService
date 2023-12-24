// pages/devices/[id].js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AddProcessModal from "../../../components/AddProcessModal";

const DeviceDetailPage = () => {
  console.log("sdagdsags");
  const router = useRouter();
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [isAddProcessModalOpen, setAddProcessModalOpen] = useState(false);
  const [processesWithDetails, setProcessesWithDetails] = useState([]);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
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

  useEffect(() => {
    // Cihaza ait işlemleri ve ilgili detayları çekmek için bir API çağrısı yapabilirsiniz
    // Örneğin: GET request ile "/api/process/device/${id}" endpoint'ine istek gönderilebilir
    // API çağrısını axios veya fetch ile gerçekleştirebilirsiniz

    // Örnek API çağrısı:
    fetchProcessesWithDetails(id);
  }, [id]);

  const fetchProcessesWithDetails = async (deviceId) => {
    try {
      const response = await fetch(
        `http://localhost:3232/process/device/${deviceId}`
      );
      const data = await response.json();
      console.log("fetchProcessesWithDetails ", data);
      setProcessesWithDetails(data);
    } catch (error) {
      console.error("Error fetching processes with details:", error);
    }
  };

  const handleAddProcessClick = () => {
    setAddProcessModalOpen(true);
  };

  const handleAddProcessModalClose = () => {
    setAddProcessModalOpen(false);
  };

  const handleProcessAdded = (addedProcess) => {
    // Burada yapılacak işlemler, eklenen işlemin DeviceDetail sayfasına yansıtılması gibi
    console.log("Process added:", addedProcess);
    // Yeni işlem eklenirse, gerekirse cihaz detaylarını güncelleyebilirsiniz.
    // Örneğin: setDevice((prevDevice) => ({ ...prevDevice, processes: [addedProcess, ...prevDevice.processes] }));
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // API'ye PATCH isteği yaparak cihazın durumunu güncelle
      const response = await fetch(`http://localhost:3232/devices/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating device status");
      }

      // Başarılı güncelleme mesajı
      console.log("Device status updated successfully");

      // Cihaz detaylarını yeniden çek
      fetch(`http://localhost:3232/devices/${id}`)
        .then((response) => response.json())
        .then((data) => setDevice(data))
        .catch((error) =>
          console.error("Error fetching updated device details:", error)
        );
    } catch (error) {
      console.error("Error updating device status:", error);
    } finally {
      // Modal'ı kapat
      setIsStatusModalOpen(false);
    }
  };
  const handleOpenStatusModal = () => {
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
  };

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        </div>
        {device.status != "Completed" && (
          <div className="mt-4">
            {device.status !== "Completed" ? (
              <button
                onClick={handleOpenStatusModal}
                className="text-blue py-2 px-4 rounded-md text-white hover:bg-green-500 bg-green-600 w-full focus:outline-none focus:shadow-outline-green active:bg-green-700"
              >
                Change Status
              </button>
            ) : (
              <button
                className="text-blue py-4 px-4 rounded-md text-white hover:bg-green-500 bg-green-600 w-full focus:outline-none focus:shadow-outline-blue active:bg-green-700 cursor-not-allowed"
                disabled
              >
                Device Status Completed
              </button>
            )}
          </div>
        )}

        <div className="mt-4">
          {device.status !== "Completed" ? (
            <button
              onClick={handleAddProcessClick}
              className="text-blue py-2 px-4 rounded-md text-white hover:bg-blue-500 bg-blue-600 w-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            >
              Add Process
            </button>
          ) : (
            <button
              className="text-blue py-4 px-4 rounded-md text-white hover:bg-green-500 bg-green-600 w-full focus:outline-none focus:shadow-outline-blue active:bg-green-700 cursor-not-allowed"
              disabled
            >
              Device Status Completed
            </button>
          )}
        </div>
        {isAddProcessModalOpen && (
          <AddProcessModal
            onClose={handleAddProcessModalClose}
            onProcessAdded={handleProcessAdded}
            deviceId={id}
          />
        )}
        <div className="text-3xl font-medium mt-10 mb-4 mx-5">Processes</div>
        <table className="min-w-full  bg-white-800 text-black mb-20 border divide-y">
          <thead className="">
            <tr>
              {/* <th className="py-2 px-4 border-r">Process ID</th> */}
              <th className="py-2 px-4 border-r">Description</th>
              <th className="py-2 px-4 border-r">Start Date</th>
              <th className="py-2 px-4 border-r">End Date</th>
              <th className="py-2 px-4 border-r">Status</th>

              <th className="py-2 px-4 border-r">Used Quantity</th>
              <th className="py-2 px-4 border-r">Part Name</th>
              <th className="py-2 px-4 border-r">Brand</th>
              <th className="py-2 px-4 border-r">Model</th>
              {/* <th className="py-2 px-4 border-r">Quantity</th> */}
              {/* <th className="py-2 px-4 border-r">Purchase Price</th> */}
              {/* <th className="py-2 px-4 border-r">Min Stock Level</th> */}
              {/* <th className="py-2 px-4 border-r">Part Created At</th>
            <th className="py-2 px-4">Part Updated At</th> */}
            </tr>
          </thead>
          <tbody>
            {processesWithDetails.map((process) => (
              <tr key={process.processID} className=" hover:bg-gray-100">
                {/* <td className="py-2 px-4 border-r">{process.processID}</td> */}
                <td className="py-2 px-4 border-r">{process.description}</td>
                <td className="py-2 px-4 border-r">{process.startDate}</td>
                <td className="py-2 px-4 border-r">{process.endDate}</td>
                <td className="py-2 px-4 border-r">{process.status}</td>

                <td className="py-2 px-4 border-r">
                  {process.ProcessDetail.usedQuantity}
                </td>
                <td className="py-2 px-4 border-r">
                  {process.ProcessDetail.SparePart?.partName}
                </td>
                <td className="py-2 px-4 border-r ">
                  {process.ProcessDetail.SparePart?.brand}
                </td>
                <td className="py-2 px-4 border-r">
                  {process.ProcessDetail.SparePart?.model}
                </td>
                {/* <td className="py-2 px-4 border-r">
                {process.ProcessDetail.SparePart?.quantity}
              </td> */}
                {/* <td className="py-2 px-4 border-r">
                {process.ProcessDetail.SparePart?.purchasePrice}
              </td> */}
                {/* <td className="py-2 px-4 border-r">
                {process.ProcessDetail.SparePart?.minStockLevel}
              </td> */}
                {/* <td className="py-2 px-4 border-r">
                {process.ProcessDetail.SparePart?.createdAt}
              </td>
              <td className="py-2 px-4">
                {process.ProcessDetail.SparePart?.updatedAt}
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isStatusModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 w-full max-w-sm rounded-md">
            <h2 className="text-xl font-bold mb-4">Select Status</h2>
            <ul>
              {["Pending", "In Progress", "Completed"].map((status) => (
                <li key={status} className="mb-2">
                  <button
                    onClick={() => handleStatusChange(status)}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
                      device.status === status ? "bg-blue-700" : ""
                    }`}
                  >
                    {status}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseStatusModal}
              className="mt-4 w-full bg-gray-500 p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetailPage;
