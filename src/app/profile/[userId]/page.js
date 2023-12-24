// pages/profile/[userId].js
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const params = useParams();
  const { userId } = params;

  const [user, setUser] = useState(null);

  useEffect(() => {
    // userId'e göre kullanıcı bilgilerini getir
    // Örnek bir API çağrısı
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3232/employees/${userId}`
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    // Kullanıcı bilgilerini getir
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {user ? (
        <div>
          <p>Name: {`${user.firstName} ${user.lastName}`}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Address: {user.address}</p>
          {/* Diğer kullanıcı bilgilerini buraya ekleyebilirsiniz */}
          <ChangePasswordForm userId={userId} />
          <UserOrders userId={userId} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// Kullanıcının siparişlerini gösteren bileşen
const UserOrders = ({ userId }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // userId'e göre kullanıcının siparişlerini getir
    // Örnek bir API çağrısı
    const fetchUnfinishedDevicesWithEmployeeOne = async () => {
      try {
        const response = await fetch(
          `/api/devices/unfinished-with-employee-one/${userId}`
        );

        if (response.ok) {
          const unfinishedDevices = await response.json();
          // Alınan veriyi state'e atayın
          setDevices(unfinishedDevices);
        } else {
          console.error("Failed to fetch unfinished devices");
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    // Kullanıcının siparişlerini getir
    if (userId) {
      fetchUnfinishedDevicesWithEmployeeOne();
    }
  }, [userId]);

  return (
    <div>
      <h2 className="text-lg font-semibold mt-4">User Orders</h2>
      {devices.length > 0 ? (
        <ul>
          {devices.map((devices) => (
            <li key={devices.devicesId}>
              devices ID: {devices.devicesId}, Total Amount:{" "}
              {devices.totalAmount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No devices found</p>
      )}
    </div>
  );
};

// Şifre değiştirme formunu içeren bileşen
const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const userId = useSelector((state) => state.user.id);
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      console.error("New passwords do not match");
      // Kullanıcıya hata mesajını göstermek için gerekli kodu ekleyebilirsiniz
      return;
    }

    // Eski şifre, yeni şifre ve doğrulama şifresi ile şifre değiştirme API çağrısı
    try {
      const response = await fetch(
        `http://localhost:3232/auth/change-password/employee`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: userId, // employeeId'yi nereden aldığınıza dair kodu eklemelisiniz
            oldPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        console.log("Password changed successfully");
        // Başarılı bir şekilde şifre değiştirildiğinde kullanıcıya bir mesaj göstermek için gerekli kodu ekleyebilirsiniz
      } else {
        console.error("Failed to change password");
        // Şifre değiştirme başarısız olduğunda kullanıcıya bir hata mesajı göstermek için gerekli kodu ekleyebilirsiniz
      }
    } catch (error) {
      console.error("API call failed:", error);
      // API çağrısı başarısız olduğunda kullanıcıya bir hata mesajı göstermek için gerekli kodu ekleyebilirsiniz
    }
  };

  return (
    <div>
      <h2 className="text-lg text-black font-semibold mt-4">Change Password</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Old Password:</label>
        <input
          type="password"
          className="mt-1 p-2 w-full border text-black rounded-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">New Password:</label>
        <input
          type="password"
          className="mt-1 p-2 w-full border focus:outline-none text-black rounded-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Confirm New Password:
        </label>
        <input
          type="password"
          className="mt-1 p-2 w-full border outline-none text-black rounded-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={handleChangePassword}
        className="bg-green-500 text-white hover:outline-none text-black py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 active:bg-green-700"
      >
        Change Password
      </button>
    </div>
  );
};

export default UserProfilePage;
