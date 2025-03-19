import { configureStore } from "@reduxjs/toolkit";
import calorieReducer from "./slices/calorieSlice";
import productsReducer from "./slices/productsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
});

const persistConfig = {
  key: "root",
  storage: typeof window !== "undefined" ? storage : createNoopStorage(),
};

const persistedReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    calorie: calorieReducer,
    products: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor =
  typeof window !== "undefined" ? persistStore(store) : null;
