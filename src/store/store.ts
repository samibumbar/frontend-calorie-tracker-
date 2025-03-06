import { configureStore } from "@reduxjs/toolkit";
import calorieReducer from "./slices/calorieSlice";
export const store = configureStore({
  reducer: {
    calorie: calorieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
