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
    <form className="text-green-500" onSubmit={handleSubmit}>
      <h2>Step 3: Add Devices</h2>
      <p>Customer ID: {customerId}</p>
      <label>Device Brand:</label>
      <input
        type="text"
        value={deviceBrand}
        onChange={(e) => setDeviceBrand(e.target.value)}
      />
      <label>Device Model:</label>
      <input
        type="text"
        value={deviceModel}
        onChange={(e) => setDeviceModel(e.target.value)}
      />
      <label>Device Serial Number:</label>
      <input
        type="text"
        value={deviceSerialNumber}
        onChange={(e) => setDeviceSerialNumber(e.target.value)}
      />
      <label>Issue Description:</label>
      <textarea
        value={deviceIssueDescription}
        onChange={(e) => setDeviceIssueDescription(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddDevicesForm;
