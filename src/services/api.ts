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
