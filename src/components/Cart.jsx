import React from "react";

const Cart = ({ cartItems, onIncrement, onDecrement, onDelete }) => {
  return (
    <div className="mb-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Cart</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        {cartItems.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
            <div className="flex mt-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => onDecrement(index)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => onIncrement(index)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded ml-auto"
                onClick={() => onDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <hr className="my-2" />
        <p className="font-semibold">
          Total: Rp{" "}
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Cart;
