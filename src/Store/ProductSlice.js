import { createSlice } from "@reduxjs/toolkit";
import AddProduct from "../components/AddProduct";

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    tambahProduct(state, action) {
      state.push(action.payload);
      console.log(action.payload);
    },
    // DeleteProduct(state, action) {
    //   const hasilFilter = state.filter((cart, index) => {
    //   });
    //     return index !== action.payload;
    //   return hasilFilter;
    // },
  },
});

export const { tambahProduct } = productSlice.actions;
export default productSlice.reducer;
