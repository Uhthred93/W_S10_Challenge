import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'All',
  reducers: {
    setFilter: (state, action) => action.payload, // Update the filter state
  },
});

export const { setFilter } = filterSlice.actions; // Export the action
export default filterSlice.reducer; // Export the reducer
