import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart : (state, action)=>{
            const itemInCard = state.cart.find((item)=>item.id === action.payload.id && item.size == action.payload.size);
            if(itemInCard){
                itemInCard.quantity = action.payload.quantity + itemInCard.quantity;
            }else{
                state.cart.push({...action.payload});
            }
        },
        incrementQuantity: (state, action)=>{
            const item = state.cart.find((item)=>item.id === action.payload.id && item.size == action.payload.size);
            if(item){
                item.quantity++;
            }
        },
        decrementQuantity: (state, action)=>{
            const item = state.cart.find((item)=>item.id === action.payload.id && item.size == action.payload.size);
            if(item){
                if(item.quantity == 1){
                    item.quantity = 1;
                }else{
                    item.quantity--;
                }
            }
        },
        removeItem: (state, action)=>{
            const itemToRemove = state.cart.find((item)=> item.id == action.payload.id && item.size == action.payload.size)
            state.cart = state.cart.filter((item)=> item !== itemToRemove)
        },
    },
})

export const cartReducer = cartSlice.reducer;

export const {

  addToCart,

  incrementQuantity,

  decrementQuantity,

  removeItem,


} = cartSlice.actions;