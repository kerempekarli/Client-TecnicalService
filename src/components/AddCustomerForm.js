// components/AddCustomerForm.js
import React, { useState } from "react";

const AddCustomerForm = ({ onCustomerAdded }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3232/customers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Failed to add customer");
        return;
      }

      const addedCustomer = await response.json();

      onCustomerAdded({ customerId: addedCustomer.id });
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <form className="text-green-500" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Step 2: Add Customer</h2>
      <div className="mb-4">
        <label className="block text-sm">First Name:</label>
        <input
          type="text"
          name="firstName"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-green-500"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm">Last Name:</label>
        <input
          type="text"
          name="lastName"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-green-500"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm">Email:</label>
        <input
          type="email"
          name="email"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-green-500"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm">Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-green-500"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-700"
      >
        Next
      </button>
    </form>
  );
};

export default AddCustomerForm;
