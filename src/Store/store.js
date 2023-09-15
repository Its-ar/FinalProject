import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import AuthSlice from "./AuthSlice";
const store = configureStore({
  reducer: {
    product: ProductSlice,
    auth: AuthSlice,
  },
});
export default store;
