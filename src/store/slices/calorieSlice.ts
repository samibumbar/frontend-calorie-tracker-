import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalorieState {
  dailyKcal: number | null;
  notRecommended: { title: string }[];
}

const initialState: CalorieState = {
  dailyKcal: null,
  notRecommended: [],
};

const calorieSlice = createSlice({
  name: "calorie",
  initialState,
  reducers: {
    setCalorieData: (state, action: PayloadAction<CalorieState>) => {
      state.dailyKcal = action.payload.dailyKcal;
      state.notRecommended = action.payload.notRecommended;
    },
    clearCalorieData: (state) => {
      state.dailyKcal = null;
      state.notRecommended = [];
    },
  },
});

export const { setCalorieData, clearCalorieData } = calorieSlice.actions;
export default calorieSlice.reducer;
