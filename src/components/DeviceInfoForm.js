// components/DeviceInfoForm.js
"use client";
import { useState } from "react";

const DeviceInfoForm = ({ prevStep, closeModal }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cihaz bilgilerini kontrol et
    // ...

    // Doğrulama başarılı ise işlemi tamamla veya modalı kapat
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Device Information</h2>
      <div className="mb-4">
        <label>Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Serial Number:</label>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Issue Description:</label>
        <textarea
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DeviceInfoForm;
