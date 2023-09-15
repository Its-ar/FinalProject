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
    <div className="flex flex-col h-screen w-screen bg-blue-300 items-center justify-center">
      <div>
        <h1 className="text-2xl">Login</h1>
      </div>

      <form onSubmit={handleLogin}>
        <div>
          Email : <br />
          <input type="email" name="email" value={formData.email} onChange={setInputValue} className="border" />
        </div>
        <div>
          Password : <br />
          <input type="password" name="password" value={formData.password} onChange={setInputValue} className="border" />
        </div>
        <button className="bg-green-400 rounded-lg p-2">Login</button>
      </form>
    </div>
  );
}
