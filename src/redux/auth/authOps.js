import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearToken, goitAPI, setToken } from "../../config/goitAPI";

export const registerThunk = createAsyncThunk(
  "signup",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitAPI.post("users/signup", credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitAPI.post("users/login", credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await goitAPI.post("users/logout");
    clearToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const getMeThunk = createAsyncThunk("getMe", async (_, thunkAPI) => {
//   try {
//     const { data } = await goitAPI.get("users/current");
//     return data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
