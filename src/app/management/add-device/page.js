// pages/management/add-devices.js
"use client";
import { useState, useEffect } from "react";
import AddDevicesModal from "../../../components/AddDevicesModal";

const AddDevicesPage = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Devices Page</h1>

      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
      >
        Open Modal
      </button>

      <AddDevicesModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default AddDevicesPage;
