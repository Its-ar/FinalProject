import React from "react";

const Invoice = ({ transactionData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Invoice</h2>
      <p>Tanggal Transaksi: {new Date(transactionData.date).toLocaleString()}</p>
      <p>Total Harga: Rp {transactionData.totalHarga.toLocaleString()}</p>
      <p>Metode Pembayaran: {transactionData.selectedPaymentMethod}</p>
      <p>Kembalian: Rp {transactionData.kembalian.toLocaleString()}</p>

      <h3 className="text-lg font-semibold mt-4">Items in Cart</h3>
      {transactionData.products.map((item, index) => (
        <div key={index} className="mb-2">
          <p className="font-semibold">{item.name}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Invoice;
