// pages/index.js

import React from "react";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-purple-600 h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-extrabold mb-4">Hoş Geldiniz!</h1>
        <p className="text-xl">Cihaz Tamir Şirketinizin Otomasyon Sistemi</p>
        <p className="mt-8 text-sm">Gelişmiş hizmetlerimizle buradayız</p>
        <button className="mt-4 bg-white text-blue-500 px-6 py-2 rounded-full hover:bg-blue-400 hover:text-white transition duration-300">
          Hizmetlerimizi Keşfedin
        </button>
      </div>
    </div>
  );
};

export default Home;
