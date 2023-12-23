// components/NavigationButtons.js
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavigationButtons = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goForward = () => {
    router.forward();
  };

  return (
    <div>
      <button
        onClick={goBack}
        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
      >
        Geri
      </button>
      <button
        onClick={goForward}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
      >
        İleri
      </button>
    </div>
  );
};

export default NavigationButtons;
