// pages/employees/[id].js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EmployeeDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Burada API'den çalışan detaylarını çekmek için bir API çağrısı yapabilirsiniz
    // Örneğin: GET request ile "/api/employees/${id}" endpoint'ine istek gönderilebilir
    // API çağrısını axios veya fetch ile gerçekleştirebilirsiniz

    // Örnek API çağrısı:
    fetch(`http://localhost:3232/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );

    // Şu anki durumu simüle etmek için sabit bir veri kullanıyoruz
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8 p-4 text-black bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Employee Details</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">First Name:</p>
          <p>{employee.firstName}</p>
        </div>
        <div>
          <p className="font-semibold">Last Name:</p>
          <p>{employee.lastName}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{employee.email}</p>
        </div>
        {/* Diğer özellikleri buraya ekleyebilirsiniz */}
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
