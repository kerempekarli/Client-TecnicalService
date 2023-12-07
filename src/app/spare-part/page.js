"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SpareParts = () => {
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    // Spare Parts'ları çeken fetch işlemi
    fetch("http://localhost:3232/spare-part")
      .then((response) => response.json())
      .then((data) => setSpareParts(data))
      .catch((error) => {
        console.error("Error fetching spare parts:", error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Spare Parts</h1>
      <div className="mb-4">
        <Link href="/spare-part/add">
          <div className="block bg-blue-500 border-blue-900 text-white border py-3 px-10 rounded-md font-medium transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white">
            Ürün ekle
          </div>
        </Link>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Stock ID</th>
            <th className="py-2 px-4 border-b">Part Name</th>
            <th className="py-2 px-4 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Model</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Purchase Price</th>
            <th className="py-2 px-4 border-b">Min Stock Level</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map((sparePart) => (
            <tr key={sparePart.stockID} className="hover:bg-gray-800">
              <td className="py-2 px-4 border-b">{sparePart.stockID}</td>
              <td className="py-2 px-4 border-b">{sparePart.partName}</td>
              <td className="py-2 px-4 border-b">{sparePart.brand}</td>
              <td className="py-2 px-4 border-b">{sparePart.model}</td>
              <td className="py-2 px-4 border-b">{sparePart.quantity}</td>
              <td className="py-2 px-4 border-b">{sparePart.purchasePrice}</td>
              <td className="py-2 px-4 border-b">{sparePart.minStockLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpareParts;
