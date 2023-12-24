"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddSparePart = () => {
  const router = useRouter();

  const [sparePartData, setSparePartData] = useState({
    partName: "",
    brand: "",
    model: "",
    quantity: 0,
    purchasePrice: 0,
    minStockLevel: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSparePartData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Yeni yedek parça eklemek için fetch işlemi
      const response = await fetch("http://localhost:3232/spare-part", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sparePartData),
      });

      if (response.ok) {
        // Başarıyla eklendiyse, yedek parça listesi sayfasına yönlendir
        router.push("/spare-part");
      }
    } catch (error) {
      console.error("Error adding spare part:", error);
    }
  };

  return (
    <div class="container mx-auto mt-8 text-black">
      <h1 class="text-3xl font-semibold mb-4">Add New Spare Part</h1>
      <form onSubmit={handleSubmit} class="max-w-md mx-auto">
        <div class="mb-4">
          <label for="partName" class="block text-sm font-medium text-gray-300">
            Part Name:
          </label>
          <input
            type="text"
            id="partName"
            name="partName"
            value={sparePartData.partName}
            onChange={handleInputChange}
            class="border border-gray-300 p-2 w-full mt-1 outline-none"
          />
        </div>
        <div class="mb-4">
          <label for="brand" class="block text-sm font-medium text-gray-600">
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={sparePartData.brand}
            onChange={handleInputChange}
            class="border border-gray-300 p-2 w-full mt-1 outline-none"
          />
        </div>
        <div class="mb-4">
          <label for="model" class="block text-sm font-medium text-gray-600">
            Model:
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={sparePartData.model}
            onChange={handleInputChange}
            class="border border-gray-300 p-2 w-full mt-1 outline-none"
          />
        </div>
        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-600">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={sparePartData.quantity}
            onChange={handleInputChange}
            class="border border-gray-300 p-2 w-full mt-1 outline-none"
          />
        </div>
        <div class="mb-4">
          <label
            for="purchasePrice"
            class="block text-sm font-medium text-gray-600"
          >
            Purchase Price:
          </label>
          <input
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            value={sparePartData.purchasePrice}
            onChange={handleInputChange}
            class="border border-gray-300 p-2 w-full mt-1 outline-none"
          />
        </div>
        <div class="mb-4">
          <label
            for="minStockLevel"
            class="block text-sm font-medium text-gray-600"
          >
            Min Stock Level:
          </label>
          <input
            type="number"
            id="minStockLevel"
            name="minStockLevel"
            value={sparePartData.minStockLevel}
            onChange={handleInputChange}
            class="border border-gray-300 p-2 w-full mt-1 outline-none"
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4">
          Add Spare Part
        </button>
      </form>
    </div>
  );
};

export default AddSparePart;
