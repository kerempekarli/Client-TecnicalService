// components/AddDevicesModal.js
"use client";
import { useState } from "react";
import AddCustomerForm from "./AddCustomerForm";
import CustomerInfoForm from "./CustomerInfoForm";
import AddDevicesForm from "./AddDevicesForm";

const AddDevicesModal = ({ showModal, closeModal }) => {
  const [step, setStep] = useState(1);
  const [customerId, setCustomerId] = useState(null);

  const handleCustomerFound = ({ customerId }) => {
    setCustomerId(customerId);
    setStep(3);
  };

  const handleCustomerAdded = ({ customerId }) => {
    setCustomerId(customerId);
    setStep(3);
  };

  const handleAddDeviceSubmit = () => {
    closeModal();
    // 3. Adımda yapılacak işlemler
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md">
        {step === 1 && (
          <CustomerInfoForm
            onCustomerFound={handleCustomerFound}
            onCustomerNotFound={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <AddCustomerForm onCustomerAdded={handleCustomerAdded} />
        )}

        {step === 3 && (
          <AddDevicesForm
            customerId={customerId}
            onSubmit={handleAddDeviceSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AddDevicesModal;
