import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import SideBar from "../layouts/SideBar";
import axios from "axios";
import { tambahProduct } from "../Store/ProductSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();

  const totalHarga = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getProduct = () => {
    axios
      .get("http://localhost:3000/product")
      .then((ress) => setProduct(ress.data))
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // dispatch(tambahProduct({ ...product, quantity: existingItem.quantity + 1 }));
      const updatedCart = cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    dispatch(tambahProduct(product));
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

  const resetCart = () => {
    setCartItems([]); // Reset the cartItems state to an empty array
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Header>{sideBar ? <i className="fa fa-close text-xl" onClick={() => setSideBar(false)}></i> : <i className="fa fa-bars text-xl" onClick={() => setSideBar(true)}></i>}</Header>
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
                {product.length > 0 &&
                  [...new Set(product.map((item) => item.category))].map((category) => (
                    <button key={category} className={`mr-4 ${selectedCategory === category ? "font-bold" : ""}`} onClick={() => handleCategoryClick(category)}>
                      {category}
                    </button>
                  ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
                {product
                  .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
                  .map((product) => (
                    <div key={product.id} className={`bg-white p-4 rounded-lg shadow ${cartItems.length === 0 ? "w-full" : ""}`}>
                      <div className="flex items-center justify-center bg-gray-100 rounded-xl px-4 py-4 ">
                        <img className="h-64 w-auto object-cover cursor-pointer hover:scale-110 transition-transform duration-500 ease-in-out" src={product.image} alt="Card Image" />
                      </div>
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
                <Checkout totalHarga={totalHarga} cartItems={cartItems} resetCart={resetCart} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
