import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";

export default function ProductsCrud() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [productIds, setProductIds] = useState(0);

  const getProduct = () => {
    axios
      .get("http://localhost:3000/product")
      .then((response) => setProduct(response.data))
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const handleOpenProduct = (productId) => {
    console.log(productId);
    if (productId) {
      setProductIds(productId);
    }
    setIsFormOpen(true);
  };

  const deleteProduct = (productId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this product?");
    if (shouldDelete) {
      axios
        .delete("http://localhost:3000/product/" + productId)
        .then(() => getProduct())
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section className="px-4 w-full">
      <h2 className="text-2xl font-montserrat font-bold border-b-2 border-blue-700">Product Management</h2>
      <div className="flex flex-col gap-2 py-2">
        <button className="border rounded-lg bg-blue-400 w-32 py-1 font-semibold text-white hover:bg-blue-700 transition" onClick={() => setIsFormOpen(true)}>
          Add Product &nbsp;<i className="fa fa-plus"></i>
        </button>
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
            {product.map((product) => (
              <tr key={product.id}>
                <td className="p-1 border border-slate-300">{product.id}</td>
                <td className="p-1 border border-slate-300">{product.name}</td>
                <td className="p-1 border border-slate-300">{product.category}</td>
                <td className="p-1 border border-slate-300">{product.price}</td>
                <td className="p-1 border border-slate-300">
                  <div className="flex justify-center">
                    <button className="bg-blue-400 border rounded-lg px-2 py-1 hover:bg-blue-700 transition">
                      <i className="fa fa-upload text-white"></i>
                    </button>
                  </div>
                </td>
                <td className="p-1 border border-slate-300 text-center">
                  <div className="flex justify-center gap-1">
                    <button onClick={() => handleOpenProduct(product.id)} className="bg-blue-400 border rounded-lg px-2 py-1 hover:bg-blue-700 transition">
                      <i className="fa fa-edit text-white"></i>
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="bg-red-600 border rounded-lg px-2 py-1 hover:bg-red-700 transition">
                      <i className="fa fa-trash-o text-white"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormOpen && <AddProduct setIsFormOpen={setIsFormOpen} id={productIds} getProducts={getProduct} setProductIds={setProductIds} />}
    </section>
  );
}
