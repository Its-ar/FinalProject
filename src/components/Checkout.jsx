import React, { useState } from "react";

const Checkout = ({ totalHarga }) => {
  const [amountPaid, setAmountPaid] = useState("");
  const [kembalian, setKembalian] = useState(0);

  const pajak = totalHarga * 0.1; // Pajak 10%
  const totalPembayaran = totalHarga + pajak;

  const handleAmountPaidChange = (event) => {
    const paidAmount = event.target.value;
    setAmountPaid(paidAmount);

    if (!isNaN(paidAmount)) {
      const kembalianAmount = paidAmount - totalPembayaran;
      setKembalian(kembalianAmount);
    } else {
      setKembalian(0);
    }
  };

  const handleBayarClick = () => {
    // ...
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Checkout</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-2">
          <p className="font-semibold">
            Total Harga: Rp {totalHarga.toLocaleString()}
          </p>
          <p className="text-gray-600">
            Pajak (10%): Rp {pajak.toLocaleString()}
          </p>
          <p className="font-semibold">
            Total Pembayaran: Rp {totalPembayaran.toLocaleString()}
          </p>
        </div>
        <div className="mb-2">
          <label htmlFor="amountPaid" className="block font-semibold">
            Uang yang Dibayarkan
          </label>
          <input
            type="number"
            id="amountPaid"
            value={amountPaid}
            onChange={handleAmountPaidChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-2">
          <p className="font-semibold">
            Kembalian: Rp {kembalian.toLocaleString()}
          </p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleBayarClick}
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default Checkout;
