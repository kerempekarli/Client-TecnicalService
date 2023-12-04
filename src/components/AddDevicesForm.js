// components/AddDevicesForm.js
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddDevicesForm = ({ customerId, onSubmit }) => {
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceSerialNumber, setDeviceSerialNumber] = useState("");
  const [deviceIssueDescription, setDeviceIssueDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDevice = {
      brand: deviceBrand,
      model: deviceModel,
      serialNumber: deviceSerialNumber,
      issueDescription: deviceIssueDescription,
      status: "Pending",
      CustomerId: customerId,
    };

    try {
      const response = await fetch("http://localhost:3232/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDevice),
      });

      if (!response.ok) {
        toast.error("HTTP Hatası");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Cihaz başarıyla eklenirse, onSubmit fonksiyonunu çağırabilirsiniz.
      toast.success("Cihaz başarıyla eklendi");
      onSubmit();
    } catch (error) {
      toast.error("Api çağrısı hatası");
      console.error("API call failed:", error);
      // Hata durumunda gerekli işlemleri yapabilirsiniz.
    }
  };

  return (
    <form
      className="max-w-md mx-auto bg-white p-8 text-black border rounded-md shadow-md mt-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-green-500 mb-4">Step 3: Add Devices</h2>
      {/* <p className="text-gray-600">Customer ID: {customerId}</p> */}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Device Brand:
        </label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={deviceBrand}
          onChange={(e) => setDeviceBrand(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Device Model:
        </label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={deviceModel}
          onChange={(e) => setDeviceModel(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Device Serial Number:
        </label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={deviceSerialNumber}
          onChange={(e) => setDeviceSerialNumber(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Issue Description:
        </label>
        <textarea
          className="mt-1 p-2 w-full border rounded-md"
          value={deviceIssueDescription}
          onChange={(e) => setDeviceIssueDescription(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AddDevicesForm;
