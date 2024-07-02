import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { GET_USER_ROLE } from "./constants";
import axios from "axios";
import { users } from "../../users";

export const fetchUserRole = createAsyncThunk(
  "data/fetchUserRole",
  async (email) => {
    const response = await axios.get(GET_USER_ROLE + email);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
  },
  reducers: {
    userProfile: (state, action) => {
      state.userData = { ...action.payload };
    },
    getDataFromDummy: (state, action) => {
      state.userData = users.filter((user) => user.email === action.payload)[0];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        const resp = action.payload;
        state.userData = resp[0];
      })
      .addCase(fetchUserRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { userProfile, getDataFromDummy } = userSlice.actions;

export default userSlice.reducer;
