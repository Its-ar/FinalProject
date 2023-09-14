import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { kurangiDariKeranjang, tambahKeKeranjang, hapusDariKeranjang } from "../Store/ProductSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();

  const handleIncrement = (product) => {
    dispatch(tambahKeKeranjang(product));
  };

  const handleDecrement = (product) => {
    dispatch(kurangiDariKeranjang(product));
  };

  const handleDelete = (product) => {
    dispatch(hapusDariKeranjang(product));
  };

  return (
    <div className="mb-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Cart</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        {cartItems.map((item) => (
          <div key={item.id} className="mb-2">
            <img className="h-24 w-24 object-cover cursor-pointer hover:scale-110 transition-transform duration-500 ease-in-out" src={item.image} alt="Card Image" />
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
            <div className="flex mt-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleDecrement(item)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleIncrement(item)}>
                +
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded ml-auto" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <hr className="my-2" />
        <p className="font-semibold">Total: Rp {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Cart;
