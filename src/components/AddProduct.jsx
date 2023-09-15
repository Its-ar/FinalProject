import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().positive().required(),
  category: yup.string().required(),
});

const AddProduct = ({ setIsFormOpen, id, getProducts, setProductIds }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const getProduct = () => {
    axios
      .get("http://localhost:3000/product/" + id)
      .then((ress) => {
        setValue("name", ress.data.name);
        setValue("category", ress.data.category);
        setValue("price", ress.data.price);
      })
      .catch((err) => alert(err));
  };
  const onSubmit = async (data) => {
    try {
      if (id) await axios.patch("http://localhost:3000/product/" + id, data);
      else await axios.post("http://localhost:3000/product", data);
      console.log(data);
      setIsFormOpen(false);
      setProductIds(0);
      getProducts();
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  const closeForm = () => {
    reset();
    setProductIds(0);
    setIsFormOpen(false);
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center">
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <form className="bg-white p-8 rounded-lg shadow-lg w-2/4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-4">Product Form</h2>
          <div className="mb-4">
            <label className="block font-bold mb-1">Name</label>
            {errors.name?.message}
            <input type="text" id="name" {...register("name")} className="w-full border border-gray-300 p-2 rounded" placeholder="Masukkan Nama Product" />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Price</label>
            {errors.price?.message}
            <input type="text" id="price" {...register("price")} className="w-full border border-gray-300 p-2 rounded" placeholder="Masukkan Harga Product" />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Catagory</label>
            {errors.category?.message}
            <input type="text" id="category" {...register("category")} className="w-full border border-gray-300 p-2 rounded" placeholder="Masukkan Category Product" />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Image</label>
            <input type="text" id="image" className="w-full border border-gray-300 p-2 rounded" {...register("image")} placeholder="Masukkan Link Gambar Product" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
          <button type="button" onClick={closeForm} className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
