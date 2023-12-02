// components/AddCustomerForm.js
"use client";
import { useState } from "react";

const AddCustomerForm = ({ onCustomerAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Burada müşteri eklenme işlemleri yapılabilir.
    // Örneğin, bir API çağrısı yaparak müşteriyi ekleyebilirsiniz.
    // Bu örnekte sadece hardkodedir.

    // Eklenen müşteri ID'si iletilir
    onCustomerAdded({ customerId: 2 });
  };

  return (
    <form className="text-green-500" onSubmit={handleSubmit}>
      <h2>Step 2: Add Customer</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Phone:</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">Next</button>
    </form>
  );
};

export default AddCustomerForm;
