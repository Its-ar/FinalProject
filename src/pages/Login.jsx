import React, { useState } from "react";
// import Header from '../component/Header.jsx';
// import Button from '../component/Cart.jsx';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../Store/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const setInputValue = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/login", formData)
      .then((res) => {
        const { accesToken, user } = res.data;
        dispatch(setToken(accesToken));
        dispatch(setUser(user));
        navigate("/");
        console.log(res.data);
      })
      .catch((err) => {
        alert("Terjadi Kesalahan");
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col h-screen bg-gray-300 items-center justify-center">
      <div className="w-96 p-2 shadow-2xl bg-blue-300 rounded-t-md">
          <h1 className="flex items-center justify-center text-2xl">Login</h1>
      </div>
      <div className="w-96 p-6 shadow-2xl bg-white rounded-b-md">
        <form onSubmit={handleLogin}>
          <div>
            Email : <br />
            <input type="email" name="email" value={formData.email} onChange={setInputValue} className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
          </div>
          <div>
            Password : <br />
            <input type="password" name="password" value={formData.password} onChange={setInputValue} className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
          </div>
          <button className="border-2 border-blue-300 bg-blue-300 text-black py-1 w-full rounded-md hover:bg-transparent hover:text-blue-300">Login</button>
        </form>
      </div>
    </div>
  );
}
