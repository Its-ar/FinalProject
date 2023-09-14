import React, { useState } from "react";
import axios from "axios";

// ... other imports and component code ...

const Checkout = ({ totalHarga, cartItems, resetCart }) => {
  const [amountPaid, setAmountPaid] = useState("");
  const [kembalian, setKembalian] = useState(0);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
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
    const transactionData = {
      date: new Date().toISOString(),
      totalHarga,
      amountPaid,
      selectedPaymentMethod,
      kembalian,
      products: cartItems,
    };
    console.log(transactionData);

    // Kirim permintaan POST untuk menyimpan data transaksi
    axios
      .post("http://localhost:3000/transactions", transactionData)
      .then((response) => {
        // Handle respon berhasil di sini, jika diperlukan
        console.log("Transaksi berhasil disimpan:", response.data);

        // Setel ulang data keranjang dan checkout
        setAmountPaid("");
        setKembalian(0);

        // Reset keranjang (cart)
        resetCart();
      })
      .catch((error) => {
        // Tangani error di sini
        console.error("Error saat menyimpan transaksi:", error);
      });

    // Tampilkan peringatan ketika transaksi berhasil
    alert("Transaksi berhasil! Terima kasih atas pembeliannya.");
  };

  const openPaymentPopup = () => {
    setIsPaymentPopupOpen(true);
  };

  const closePaymentPopup = () => {
    setIsPaymentPopupOpen(false);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    closePaymentPopup();
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Checkout</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-2">
          <p className="font-semibold">Total Harga: Rp {totalHarga.toLocaleString()}</p>
          <p className="text-gray-600">Pajak (10%): Rp {pajak.toLocaleString()}</p>
          <p className="font-semibold">Total Pembayaran: Rp {totalPembayaran.toLocaleString()}</p>
          {selectedPaymentMethod && <p className="font-semibold">Metode Pembayaran: {selectedPaymentMethod}</p>}
        </div>
        <div className="mb-2">
          <button className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${selectedPaymentMethod ? "pointer-events-none opacity-70" : ""}`} onClick={openPaymentPopup}>
            {selectedPaymentMethod ? `Metode Pembayaran: ${selectedPaymentMethod}` : "Pilih Metode Pembayaran"}
          </button>
          {selectedPaymentMethod && (
            <button
              className="bg-red-400 text-white px-4 py-2 rounded mt-4 ml-2"
              onClick={() => {
                setSelectedPaymentMethod("");
                openPaymentPopup();
              }}
            >
              Ubah
            </button>
          )}
          {isPaymentPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={closePaymentPopup}>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Pilih Metode Pembayaran</h3>
                <button onClick={() => handlePaymentMethodSelect("Shoppe")} className="block w-full text-left py-2 px-4 mb-2 border rounded">
                  Shope
                </button>
                <button onClick={() => handlePaymentMethodSelect("Dana")} className="block w-full text-left py-2 px-4 mb-2 border rounded">
                  Dana
                </button>
                <button onClick={() => handlePaymentMethodSelect("Gopay")} className="block w-full text-left py-2 px-4 mb-2 border rounded">
                  Gopay
                </button>
                <button onClick={() => handlePaymentMethodSelect("Cash")} className="block w-full text-left py-2 px-4 mb-2 border rounded">
                  Cash
                </button>
                <button onClick={closePaymentPopup} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mt-4">
                  Batal
                </button>
              </div>
            </div>
          )}
          <label htmlFor="amountPaid" className="block font-semibold">
            Uang yang Dibayarkan
          </label>
          <input type="number" id="amountPaid" value={amountPaid} onChange={handleAmountPaidChange} className="border rounded px-2 py-1 w-full" />
        </div>
        <div className="mb-2">
          <p className="font-semibold">Kembalian: Rp {kembalian.toLocaleString()}</p>
        </div>

        {/* Conditional check for cartItems */}
        {cartItems && cartItems.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Items in Cart</h3>
            {cartItems.map((item, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        )}

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleBayarClick} // Pastikan tombol 'bayar' memanggil handleBayarClick
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default Checkout;
