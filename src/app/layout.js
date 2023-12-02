"use client";
import Modal from "react-modal";

// Root elementini belirle

// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store"; // Redux store ve persistor'ı ekleyin
import store from "../redux/store"; // Redux store ve persistor'ı ekleyin
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

// react-modal için appElement'i ayarla

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer></ToastContainer>
          <div>{children}</div>
        </PersistGate>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
