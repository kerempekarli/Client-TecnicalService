// pages/customers/[customerId].js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const CustomerProfile = () => {
  const router = useRouter();
  const { id: customerId } = useSelector((state) => state.user);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // customerId mevcut olduğunda ve customer boşsa isteği yap
    if (customerId && !customer) {
      fetchCustomerData();
    }
  }, [customerId, customer]);

  const fetchCustomerData = async () => {
    try {
      // customerId'yi kullanarak backend'ten kullanıcı bilgilerini çek
      const response = await fetch(
        `http://localhost:3232/customers/${customerId}`
      );
      const data = await response.json();

      // Gelen veriyi state'e set et
      setCustomer(data);
    } catch (error) {
      console.error("Kullanıcı bilgilerini alma hatası:", error);
    }
  };

  if (!customer) {
    // Veri henüz yüklenmediyse loading gösterebilirsiniz
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {customer.firstName} {customer.lastName}
      </h1>
      <p>Email: {customer.email}</p>
      <p>Telefon: {customer.phoneNumber}</p>
      {/* Diğer kullanıcı bilgilerini burada gösterebilirsiniz */}
    </div>
  );
};

export default CustomerProfile;
