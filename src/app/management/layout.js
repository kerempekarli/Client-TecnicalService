import React from "react";
import Link from "next/link";

export default function layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Tab Menü */}
      <div className="bg-gray-800 p-4">
        <div className="flex space-x-4">
          <Link href="/management/add-device">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white">
              Cihaz Ekle
            </div>
          </Link>
          <Link href="/management/add-employee">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white">
              Çalışan Ekle
            </div>
          </Link>
          {/* Diğer sayfa linkleri buraya eklenebilir */}
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="flex-grow p-4">
        <div>{children}</div>
      </div>
    </div>
  );
}
