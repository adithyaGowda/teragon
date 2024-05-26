import { createSlice, current } from "@reduxjs/toolkit";

const parameterSlice = createSlice({
  name: "parameter",
  initialState: {
    params: [],
  },
  reducers: {
    addParam: (state, action) => {
      state.params = [...action.payload];
    },
    updateParam: (state, action) => {
      state.params.map((param, i) => {
        if (param.id === action.payload.id) state.params[i] = action.payload;
      });
    },
  },
});

export const { updateParam, addParam } = parameterSlice.actions;

export default parameterSlice.reducer;
