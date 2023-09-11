import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transaction data from the API
    axios
      .get("http://localhost:3000/transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  // Function to format a date string to Indonesian GMT+7 timezone
  const formatDateToGMT7 = (dateString) => {
    const options = {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleString("id-ID", options);
  };

  return (
    <>
      <section className="px-4 w-full">
        <h2 className="text-2xl font-montserrat font-bold border-b-2 border-blue-700">
          Recent Orders <i className="fa fa-cart-arrow-down"></i>
        </h2>
        <div className="flex justify-center">
          <div className="py-2 w-4/5 flex justify-center">
            <table className="table-auto w-full border-collapse border border-slate-500 p-24">
              <thead>
                <tr>
                  <th className="p-1 border border-slate-500">Order ID</th>
                  <th className="p-1 border border-slate-500">
                    Order Date (GMT+7)
                  </th>
                  <th className="p-1 border border-slate-500">Total Harga</th>
                  <th className="p-1 border border-slate-500">Kembalian</th>
                  <th className="p-1 border border-slate-500">Products</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="p-1 border border-slate-300">
                      {transaction.id}
                    </td>
                    <td className="p-1 border border-slate-300">
                      {formatDateToGMT7(transaction.date)}
                    </td>
                    <td className="p-1 border border-slate-300">{`Rp ${transaction.totalHarga.toLocaleString()}`}</td>
                    <td className="p-1 border border-slate-300">{`Rp ${transaction.kembalian.toLocaleString()}`}</td>
                    <td className="p-1 border border-slate-300">
                      <ul>
                        {transaction.products.map((product) => (
                          <li key={product.id}>
                            {product.name} (Qty: {product.quantity})
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
