import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import authSlice from "./authSlice";
const store = configureStore({
  reducer: {
    cart: ProductSlice,
    auth: authSlice,
  },
});
export default store;

