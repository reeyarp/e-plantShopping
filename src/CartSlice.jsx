import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    itemQuant: 0
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.itemQuant += 1;
    },
    removeItem: (state, action) => {
      const {name, quantity} = action.payload;
      state.items = state.items.filter(item => item.name !== name);
      state.itemQuant -= quantity;

      if(state.itemQuant < 0){
        state.itemQuant = 0;
      }

    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; 
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        state.itemQuant += quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;