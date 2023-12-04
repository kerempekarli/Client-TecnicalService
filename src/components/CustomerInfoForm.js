// components/CustomerInfoForm.js

"use client";
import { useState } from "react";

const CustomerInfoForm = ({ onCustomerFound, onCustomerNotFound }) => {
  const [email, setEmail] = useState("");

  const handleCustomerFound = ({ customerId }) => {
    onCustomerFound({ customerId });
  };

  const handleCustomerAdded = ({ customerId }) => {
    onCustomerAdded({ customerId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3232/customers/getByEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        onCustomerNotFound();
        console.error("Email not found, triggering error");
        return;
      }

      const isCustomerFound = await response.json();

      console.log("CUSTOMER RESPONSE", isCustomerFound);

      if (isCustomerFound) {
        handleCustomerFound({ customerId: isCustomerFound.id });
      } else {
        onCustomerNotFound();
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto text-black p-6 bg-white rounded-md shadow-md mt-6"
    >
      <h2 className="text-2xl text-green-500 mb-4 font-semibold">
        Customer Information
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Email:
        </label>
        <input
          type="email"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-green-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default CustomerInfoForm;
