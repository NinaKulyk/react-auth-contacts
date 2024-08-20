import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearToken, goitAPI, setToken } from "../../config/goitAPI";

export const registerThunk = createAsyncThunk(
  "signup",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitAPI.post("users/register", credentials);
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

export const getMeThunk = createAsyncThunk("getMe", async (_, thunkAPI) => {
  const savedToken = thunkAPI.getState().auth.token;
  if (savedToken === null) {
    return thunkAPI.rejectWithValue("Token is not exist");
  }

  try {
    setToken(savedToken);
    const { data } = await goitAPI.get("users/current");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
