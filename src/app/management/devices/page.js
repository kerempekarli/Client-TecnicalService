// pages/devices.js
import React, { useState, useEffect } from "react";
import Link from "next/link";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Burada API'den tüm cihazları çeken bir fonksiyon kullanabilirsiniz.
    // Bu örnekte dummy data kullanıldı.
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3232/devices");
        if (!response.ok) {
          throw new Error("API call failed");
        }

        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Devices</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            <Link href={`/devices/${device.id}`}>
              <a>
                {device.brand} {device.model}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevicesPage;
