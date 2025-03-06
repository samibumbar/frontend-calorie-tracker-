export async function getPublicCalories({
  height,
  weight,
  desiredWeight,
  age,
  bloodType,
}: {
  height: number;
  weight: number;
  desiredWeight: number;
  age: number;
  bloodType: number;
}) {
  try {
    const url = `http://localhost:5000/api/calories/public?height=${height}&weight=${weight}&desiredWeight=${desiredWeight}&age=${age}&bloodType=${bloodType}`;

    console.log("📤 Sending request to:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📥 Received response:", data);

    return data;
  } catch (error) {
    console.error("❌ Failed to fetch calorie data:", error);
    throw error;
  }
}
