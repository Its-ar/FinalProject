import React, { useState } from "react";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import SideBar from "../layouts/Sidebar";

export default function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [dummyProducts] = useState([
    { id: 1, name: "Produk A", price: 20000, category: "food" },
    { id: 2, name: "Produk B", price: 15000, category: "beverage" },
    { id: 3, name: "Produk C", price: 12000, category: "food" },
    { id: 4, name: "Produk D", price: 18000, category: "beverage" },
    { id: 5, name: "Produk E", price: 25000, category: "food" },
    { id: 6, name: "Produk F", price: 14000, category: "beverage" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const totalHarga = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity++;
    setCartItems(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCartItems(updatedCart);
    }
  };

  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === "all" ? dummyProducts : dummyProducts.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Header>{sideBar ? <i className="	fa fa-close text-xl" onClick={() => setSideBar(false)}></i> : <i className="fa fa-bars text-xl" onClick={() => setSideBar(true)}></i>}</Header>
      <div className="flex gap-3">
        {sideBar ? <SideBar /> : null}
        <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-4 text-center">Cashier Point Of Sales</h1>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 mr-4 flex-1 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Order Produk</h2>
              <hr />
              <div>
                <button className={`mr-4 ${selectedCategory === "all" ? "font-bold" : ""}`} onClick={() => handleCategoryClick("all")}>
                  All
                </button>
                <button className={`mr-4 ${selectedCategory === "food" ? "font-bold" : ""}`} onClick={() => handleCategoryClick("food")}>
                  Food
                </button>
                <button className={`mr-4 ${selectedCategory === "beverage" ? "font-bold" : ""}`} onClick={() => handleCategoryClick("beverage")}>
                  Beverage
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className={`bg-white p-4 rounded-lg shadow ${cartItems.length === 0 ? "w-full" : ""}`}>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-600">Rp {product.price.toLocaleString()}</p>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mt-2" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="w-full md:w-1/3 mt-4 md:mt-0 flex flex-col bg-white p-6 rounded-lg shadow-md">
                <Cart cartItems={cartItems} onIncrement={handleIncrement} onDecrement={handleDecrement} onDelete={handleDelete} />
                <Checkout totalHarga={totalHarga} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}