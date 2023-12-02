// pages/management/add-devices.js
'use client'
import { useState } from "react";
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openModal}
      >
        Add Devices
      </button>

      <AddDevicesModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default AddDevicesPage;
