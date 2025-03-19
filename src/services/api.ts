interface SaveCaloriesRequest {
  height: number;
  weight: number;
  desiredWeight: number;
  age: number;
  bloodType: number;
}

interface SaveCaloriesResponse {
  dailyKcal: number;
  notRecommended: { title: string }[];
}
interface SummaryResponse {
  dailyKcal: number;
  totalCaloriesConsumed: number;
  consumedProducts: {
    product: { title: string; calories: number };
    quantity: number;
  }[];
  notRecommended: { title: string }[];
}
export const saveDailyCalories = async (
  data: SaveCaloriesRequest,
  token: string
): Promise<SaveCaloriesResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/days/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error("Failed to save daily calories");
  return response.json();
};

export const getSummary = async (
  date: string,
  token: string
): Promise<SummaryResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/days/${date}/summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch summary data");
  return response.json();
};
