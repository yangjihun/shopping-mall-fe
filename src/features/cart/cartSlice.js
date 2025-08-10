import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

const initialState = {
  loading: false,
  error: "",
  cartList: [],
  selectedItem: {},
  cartItemCount: 0,
  totalPrice: 0,
};

// Async thunk actions
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, size }, { rejectWithValue, dispatch }) => {
    try{
      const response = await api.post('/cart', {productId:id, size, qty:1});
      dispatch(showToastMessage({message:'카트에 아이템이 추가됐습니다', status:'success'}));
      return response.data.cartItemQty;
    } catch(error){
      if (error.error==='아이템이 이미 카트에 존재합니다') {
        dispatch(showToastMessage({message:error.error, status:'error'}));
      } else{
        dispatch(showToastMessage({message:'카트에 아이템 추가 실패', status:'error'}));
      }
    }
  }
);

export const getCartList = createAsyncThunk(
  "cart/getCartList",
  async (_, { rejectWithValue, dispatch }) => {
    try{
      const response = await api.get('/cart');
      return response.data.data;
    } catch(error){
      return rejectWithValue(error.error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id, { rejectWithValue, dispatch }) => {
    try{
      const response = await api.delete(`/cart/${id}`);
      dispatch(getCartList());
      dispatch(showToastMessage({status:'success',message:'상품을 삭제했습니다'}));
    } catch(error){
      return rejectWithValue(error.error);
    }
  }
);

export const updateQty = createAsyncThunk(
  "cart/updateQty",
  async ({ id, value }, { rejectWithValue }) => {
    try{
      const response = await api.put(`/cart/${id}`, {qty:value});
      return response.data.data;
    } catch(error){
      return rejectWithValue(error.error);
    }
  }
);

export const getCartQty = createAsyncThunk(
  "cart/getCartQty",
  async (_, { rejectWithValue, dispatch }) => {
    try{
      const response = await api.get('/cart');
      return response.data.cartItemQty;
    } catch(error){
      return rejectWithValue(error.error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initialCart: (state) => {
      state.cartItemCount = 0;
    },
    // You can still add reducers here for non-async actions if necessary
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending,(state,action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled,(state,action) => {
        state.loading = false;
        state.error = '';
        state.cartItemCount = action.payload;
      })
      .addCase(addToCart.rejected,(state,action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartList.pending,(state,action)=>{
        state.loading = true;
      })
      .addCase(getCartList.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = '';
        state.cartList = action.payload;
        state.totalPrice = action.payload.reduce(
          (total,item) => total + item.productId.price * item.qty,
          0
        );
        state.cartItemCount = action.payload.length;
      })
      .addCase(getCartList.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQty.pending,(state,action)=>{
        state.loading = true;
      })
      .addCase(updateQty.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = '';
        state.cartList = action.payload;
        state.totalPrice = action.payload.reduce(
          (total,item) => total + item.productId.price * item.qty,
          0
        );
        state.cartItemCount = action.payload.length;
      })
      .addCase(updateQty.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartQty.pending, (state,action)=>{
        state.loading = true;
      })
      .addCase(getCartQty.fulfilled, (state,action)=>{
        state.loading = false;
        state.error = '';
        state.cartItemCount = action.payload;
      })
      .addCase(getCartQty.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCartItem.pending,(state,action)=>{
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled,(state,action)=>{
        state.loading= false;
        state.error = '';
        state.cartList = action.payload;
        state.totalPrice = action.payload.reduce(
          (total,item) => total + item.productId.price * item.qty,
          0
        );
        state.cartItemCount = action.payload.length;
        
      })
      .addCase(deleteCartItem.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default cartSlice.reducer;
export const { initialCart } = cartSlice.actions;
