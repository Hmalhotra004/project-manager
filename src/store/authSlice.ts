import auth from "@/firebase/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
});

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = null;
      });
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
