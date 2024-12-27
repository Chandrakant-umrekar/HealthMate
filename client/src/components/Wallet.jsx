import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";

const Wallet = () => {
  const { wallet } = useApp();

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
        {wallet !== null ? (
          <p className="text-lg">₹{wallet}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;
