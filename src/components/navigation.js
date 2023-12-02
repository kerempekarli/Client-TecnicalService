// components/Navigation.js
"use client";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/customer/dashboard/home">
            <div>Home</div>
          </Link>
        </li>
        <li>
          <Link href="/customer/dashboard/repair-status">
            <div>Repair Status</div>
          </Link>
        </li>
        <li>
          <Link href="/customer/dashboard/profile">
            <div>Profile</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
