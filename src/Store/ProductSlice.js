import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [], // Simpan daftar produk
    cart: [], // Simpan item-item dalam keranjang belanja
  },
  reducers: {
    tambahProduct(state, action) {
      state.products.push(action.payload);
      console.log(action.payload);
    },
    tambahKeKeranjang(state, action) {
      const productToAdd = state.products.find((product) => product.id === action.payload.id);
      console.log(action.payload);

      if (productToAdd) {
        const existingCartItem = state.cart.find((item) => item.id === productToAdd.id);

        if (existingCartItem) {
          // Jika produk sudah ada di keranjang, tambahkan ke jumlahnya
          existingCartItem.quantity++;
        } else {
          // Jika produk belum ada di keranjang, tambahkan ke keranjang
          state.cart.push({ ...productToAdd, quantity: 1 });
        }
      }
    },
    kurangiDariKeranjang(state, action) {
      const itemToDecrement = state.cart.find((item) => item.id === action.payload.id);

      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity--;
      }
    },
    hapusDariKeranjang(state, action) {
      const itemToDelete = state.cart.find((item) => item.id === action.payload.id);

      if (itemToDelete) {
        // Hapus item dari keranjang belanja
        state.cart = state.cart.filter((item) => item.id !== itemToDelete.id);
      }
    },
  },
});

export const { tambahProduct, tambahKeKeranjang, kurangiDariKeranjang, hapusDariKeranjang } = productSlice.actions;

export default productSlice.reducer;
