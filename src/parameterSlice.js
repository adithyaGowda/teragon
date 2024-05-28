import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { DUMMY_FETCH_API } from "./constants";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(DUMMY_FETCH_API);
  return response.data;
});

export const submitForm = createAsyncThunk(
  "data/submitForm",
  async (formData, { dispatch }) => {
    await axios.post(DUMMY_FETCH_API, formData);
    dispatch(fetchData());
  }
);

const parameterSlice = createSlice({
  name: "parameter",
  initialState: {
    params: [],
    deleteParams: [],
    editParams: [],
    status: "idle",
    error: null,
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
    deleteParam: (state, action) => {
      state.deleteParams.push(action.payload);
    },
    editParam: (state, action) => {
      state.editParams.push(action.payload);
    },
    removeEditId: (state, action) => {
      const index = state.editParams.indexOf(action.payload);
      if (index > -1) state.editParams.splice(index, 1);
    },
    resetEditDelete: (state) => {
      state.deleteParams.length = 0;
      state.editParams.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.params = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  updateParam,
  addParam,
  deleteParam,
  editParam,
  resetEditDelete,
  removeEditId,
} = parameterSlice.actions;

export default parameterSlice.reducer;
