import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import SideBar from "../layouts/SideBar";
import axios from "axios";
import { tambahProduct } from "../Store/ProductSlice";
import { tambahKeKeranjang, clearCart } from "../Store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setsearch] = useState(""); // Tambah state untuk input pencarian
  const dispatch = useDispatch();

  const totalHarga = useSelector((state) => state.product.cart.reduce((total, item) => total + item.price * item.quantity, 0));
  const cart = useSelector((state) => state.product.cart);

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
    const existingItem = cart.find((item) => item.id === product.id);

    dispatch(tambahProduct(product));
    if (existingItem) {
      dispatch(tambahKeKeranjang({ ...product, quantity: existingItem.quantity + 1 }));
    } else {
      dispatch(tambahKeKeranjang({ ...product, quantity: 1 }));
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const resetCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Header>{sideBar ? <i className="fa fa-close text-xl" onClick={() => setSideBar(false)}></i> : <i className="fa fa-bars text-xl" onClick={() => setSideBar(true)}></i>}</Header>
      <div className="flex gap-3">
        {sideBar ? <SideBar /> : null}
        <div className="top-0 container mx-auto p-8 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-4 text-center">Cashier Point Of Sales</h1>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 mr-4 flex-1 bg-white p-6 rounded-lg shadow-md">
              <div className="w-full flex justify-between m-2">
                <h2 className="text-xl font-semibold mb-2">Order Produk</h2>
                <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
                  <input
                    type="search"
                    className="rounded p-2 h-8 w-full md:w-64 bg-blue-200"
                    placeholder="Search Product..."
                    value={search} // Hubungkan input dengan state search
                    onChange={(e) => setsearch(e.target.value)} // Tangani perubahan nilai input dan perbarui state
                  />
                  <button className="rounded p-2 h-8 bg-blue-300 flex items-center ml-2">
                    <i className="fa fa-search text-xl"></i>
                  </button>
                </div>
              </div>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
                {product
                  .filter((product) => {
                    // Filter produk berdasarkan kategori yang dipilih
                    const categoryFilter = selectedCategory === "all" || product.category === selectedCategory;

                    // Filter produk berdasarkan pencarian
                    const searchFilter = product.name.toLowerCase().includes(search.toLowerCase());

                    return categoryFilter && searchFilter;
                  })
                  .map((product) => (
                    <div key={product.id} className={`bg-white p-4 rounded-lg shadow ${cart.length === 0 ? "w-full" : ""}`}>
                      <div className="flex items-center justify-center bg-gray-100 rounded-xl px-2 py-2">
                        <img className="h-auto w-auto object-cover aspect-square cursor-pointer hover:scale-110 transition-transform duration-500 ease-in-out" src={product.image} alt="Card Image" />
                      </div>
                      <div className="flex flex-col justify-between md:flex-row"> 
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-gray-600">Rp {product.price.toLocaleString()}</p>
                      </div>
                      
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            {cart.length > 0 && (
              <div className="w-full md:w-1/3 mt-4 md:mt-0 flex flex-col bg-white p-6 rounded-lg shadow-md">
                <Cart />
                <Checkout totalHarga={totalHarga} cartItems={cart} resetCart={resetCart} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
