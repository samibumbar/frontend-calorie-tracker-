import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../utils/config";

export interface Product {
  _id: string;
  title: string;
  calories: number;
  weight: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return (await response.json()) as Product[];
});

export const addProduct = createAsyncThunk(
  "products/add",
  async ({
    title,
    calories,
    weight,
  }: {
    title: string;
    calories: number;
    weight: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, calories, weight }),
    });

    if (!response.ok) throw new Error("Failed to add product");
    return await response.json();
  }
);

export const removeProduct = createAsyncThunk(
  "products/remove",
  async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) throw new Error("Failed to remove product");
    return productId;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
        }
      )
      .addCase(
        removeProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (product) => product._id !== action.payload
          );
        }
      );
  },
});

export default productsSlice.reducer;
