// components/AddProcessForm.js
"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const AddProcessForm = ({ onProcessAdded, onClose, deviceId }) => {
  const [formData, setFormData] = useState({
    description: "",
    status: "pending",
    stockID: null,
    usedQuantity: 0,
    DeviceId: deviceId,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [spareParts, setSpareParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await fetch("http://localhost:3232/spare-part");
        if (response.ok) {
          const data = await response.json();
          setSpareParts(data);
        } else {
          console.error("Error fetching spare parts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching spare parts:", error);
      }
    };

    fetchSpareParts();
  }, []);

  useEffect(() => {
    // Kullanıcının girdiği metne göre filtreleme yap
    const filtered = spareParts.filter((part) =>
      part.partName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrelenmiş seçenekleri güncelle
    setFilteredOptions(
      filtered.map((part) => ({
        value: part.stockID,
        label: `${part.partName} - ${part.brand} - ${part.model}`,
      }))
    );
  }, [searchTerm, spareParts]);

  const handleChange = (e, selectedOption) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStockIDChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      stockID: selectedOption ? selectedOption.value : null,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3232/process", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      console.log("DÖNEN RESPONSE", formData);

      if (response.ok) {
        const responseData = await response.json();
        onProcessAdded(responseData);
        onClose();
      } else {
        console.log("Başarısız gönderme işlemi");
        console.error("Error adding process:", response.statusText);
      }
    } catch (error) {
      console.log("Başarısız işlem");
      console.error("Error adding process:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Process</h2>
      <form onSubmit={onSubmit}>
        {/* Diğer form alanları */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Diğer form alanları */}

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-600"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="stockID"
            className="block text-sm font-medium text-gray-600"
          >
            Stock ID
          </label>
          <Select
            options={filteredOptions}
            value={filteredOptions.find(
              (option) => option.value === formData.stockID
            )}
            onChange={handleStockIDChange}
            onInputChange={(inputValue) => setSearchTerm(inputValue)}
            placeholder="Search and select Stock ID"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="usedQuantity"
            className="block text-sm font-medium text-gray-600"
          >
            Used Quantity
          </label>
          <input
            type="number"
            id="usedQuantity"
            name="usedQuantity"
            value={formData.usedQuantity}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Process"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProcessForm;
