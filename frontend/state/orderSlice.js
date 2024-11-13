import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
   name: 'order',
   initialState: {
     filter: 'All',
   },
   reducers: {
    setFilter(state, action) {
      state.filter = action.payload;  
    },
   },
});

export const { setFilter } = orderSlice.actions;
export default orderSlice.reducer;