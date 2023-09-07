import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function ProductsCrud() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen);
  };

  const form = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    setIsFormOpen(false);
  };
  return (
    <section className="px-4 w-full">
      <h2 className="text-2xl font-montserrat font-bold border-b-2 border-blue-700">
        Product Management
      </h2>
      <div className="flex flex-col gap-2 py-2">
        <button
          className="border rounded-lg bg-blue-400 w-32 py-1 font-semibold text-white hover:bg-blue-700 transition"
          onClick={handleFormToggle}
        >
          Add Product &nbsp;<i class="fa fa-plus"></i>
        </button>
        {isFormOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <form
              className="bg-white p-8 rounded-lg shadow-lg w-2/4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="text-2xl font-bold mb-4">Product Form</h2>
              <div className="mb-4">
                <label className="block font-bold mb-1">Name</label>
                {errors.nama?.message}
                <input
                  type="text"
                  id="nama"
                  {...register("nama")}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Price</label>
                {errors.harga?.message}
                <input
                  type="text"
                  id="harga"
                  {...register("harga")}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Catagory</label>
                {errors.desc?.message}
                <input
                  type="text"
                  id="desc"
                  {...register("desc")}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Image</label>
                <input
                  accept="image/*"
                  type="file"
                  className="w-full border border-gray-300 p-2 rounded"
                  {...register("image")}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleFormToggle}
                className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <table className="table-auto w-full border-collapse border border-slate-500 p-24 ">
          <thead>
            <tr>
              <th className="p-1 border border-slate-500">Product ID</th>
              <th className="p-1 border border-slate-500">Product Name</th>
              <th className="p-1 border border-slate-500">Catagory</th>
              <th className="p-1 border border-slate-500">Price</th>
              <th className="p-1 border border-slate-500">Images</th>
              <th className="p-1 border border-slate-500">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1 border border-slate-300">12345</td>
              <td className="p-1 border border-slate-300">
                Kopi item cap Liong
              </td>
              <td className="p-1 border border-slate-300">coffe</td>
              <td className="p-1 border border-slate-300">$150.00</td>
              <td className="p-1 border border-slate-300">
                <div className="flex justify-center">
                  <button className="bg-blue-400 border rounded-lg px-2 py-1 hover:bg-blue-700 transition">
                    <i class="fa fa-upload text-white"></i>
                  </button>
                </div>
              </td>
              <td className="p-1 border border-slate-300 text-center">
                <div className="flex justify-center gap-1">
                  <button className="bg-blue-400 border rounded-lg px-2 py-1 hover:bg-blue-700 transition">
                    <i class="fa fa-edit text-white"></i>
                  </button>

                  <button className="bg-red-600 border rounded-lg px-2 py-1 hover:bg-red-700 transition">
                    <i class="fa fa-trash-o text-white"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-1 border border-slate-300">12346</td>
              <td className="p-1 border border-slate-300">Teh tarik</td>
              <td className="p-1 border border-slate-300">non-coffee</td>
              <td className="p-1 border border-slate-300">$75.50</td>
              <td className="p-1 border border-slate-300">
                <div className="flex justify-center">
                  <button className="bg-blue-400 border rounded-lg px-2 py-1 hover:bg-blue-700 transition">
                    <i class="fa fa-upload text-white"></i>
                  </button>
                </div>
              </td>
              <td className="p-1 border border-slate-300 text-center">
                <div className="flex justify-center gap-1">
                  <button className="bg-blue-400 border rounded-lg px-2 py-1 hover:bg-blue-700 transition">
                    <i class="fa fa-edit text-white "></i>
                  </button>

                  <button className="bg-red-600 border rounded-lg px-2 py-1 hover:bg-red-700 transition">
                    <i class="fa fa-trash-o text-white"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
