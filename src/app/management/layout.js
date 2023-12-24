import React from "react";
import Link from "next/link";

export default function layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Tab Menü */}
      <div className="bg-gray-800 p-4">
        <div className="flex justify-center">
          <Link href="/management/add-device">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white px-4 py-2">
              Cihaz Ekle
            </div>
          </Link>
          <Link href="/management/add-employee">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white px-4 py-2">
              Çalışan Ekle
            </div>
          </Link>
          <Link href="/management/devices">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white px-4 py-2">
              Cihazlar
            </div>
          </Link>
          <Link href="/management/employees">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white px-4 py-2">
              Profesyoneller
            </div>
          </Link>
          <Link href="/management/customers">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white px-4 py-2">
              Müşteriler
            </div>
          </Link>
          <Link href="/spare-part">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white px-4 py-2">
              Stok
            </div>
          </Link>
          <Link href="/spare-part/add">
            <div className="text-white cursor-pointer border-b-2 border-transparent hover:border-white px-4 py-2">
              Parça ekle
            </div>
          </Link>
          {/* Add other page links here */}
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="flex-grow p-4">
        <div>{children}</div>
      </div>
    </div>
  );
}
