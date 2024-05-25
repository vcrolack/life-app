import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { lifeSlice } from "./life";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    life: lifeSlice.reducer,
  },
});

