import React from "react";

export default function TransactionHistory() {
  return (
    <>
      <section className=" px-4 w-full">
        <h2 className="text-2xl font-montserrat font-bold border-b-2 border-blue-700">
          Recent Orders <i className="fa fa-cart-arrow-down"></i>
        </h2>
        <div className="flex justify-center">
          <div className="py-2 w-4/5 flex justify-center">
            <table className="table-auto w-full border-collapse border border-slate-500 p-24 ">
              <thead>
                <tr>
                  <th className="p-1 border border-slate-500">Order ID</th>
                  <th className="p-1 border border-slate-500">Customer Name</th>
                  <th className="p-1 border border-slate-500">Order Date</th>
                  <th className="p-1 border border-slate-500">Total Amount</th>
                  <th className="p-1 border border-slate-500">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-1 border border-slate-300">12345</td>
                  <td className="p-1 border border-slate-300">John Doe</td>
                  <td className="p-1 border border-slate-300">2023-08-01</td>
                  <td className="p-1 border border-slate-300">$150.00</td>
                  <td className="p-1 border border-slate-300">
                    <div className="flex justify-center border-blue-400">
                      <button className="bg-blue-400 border rounded-lg px-2 py-1 hover:bg-blue-700 transition">
                        <i className="fa fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-1 border border-slate-300">12346</td>
                  <td className="p-1 border border-slate-300">Jane Smith</td>
                  <td className="p-1 border border-slate-300">2023-08-02</td>
                  <td className="p-1 border border-slate-300">$75.50</td>
                  <td className="p-1 border border-slate-300">
                    <div className="flex justify-center">
                      <button className="bg-blue-400  rounded-lg px-2 py-1 hover:bg-blue-700 transition">
                        <i className="fa fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
