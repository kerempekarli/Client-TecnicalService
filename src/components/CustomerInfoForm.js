// components/CustomerInfoForm.js

"use client";

import { useState } from "react";

const CustomerInfoForm = ({ onCustomerFound, onCustomerNotFound }) => {
  const [email, setEmail] = useState("");

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const isCustomerFound = await response.json(); // API'den dönen veriye göre müşteri bulunup bulunmadığı kontrol ediliyor

      console.log("CUSTOMER RESPONSE", isCustomerFound);

      if (isCustomerFound) {
        onCustomerFound({ customerId: isCustomerFound.id });
      } else {
        onCustomerNotFound();
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Hata durumunda gerekli işlemleri yapabilirsiniz.
    }
  };

  return (
    <form className="text-green-500" onSubmit={handleSubmit}>
      <h2>Step 1: Customer Information</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Next</button>
    </form>
  );
};

export default CustomerInfoForm;
