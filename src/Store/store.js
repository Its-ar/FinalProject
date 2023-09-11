import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";

const store = configureStore({
  reducer: {
    cart: ProductSlice,
  },
});
export default store;
