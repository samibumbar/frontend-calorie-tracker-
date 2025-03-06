"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, RadioGroup } from "../atoms";
import { Modal } from "./modal";
import { getPublicCalories } from "@/utils/api";

export function CalorieIntakeFormPublic() {
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [desiredWeight, setDesiredWeight] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("1");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyKcal, setDailyKcal] = useState<number | null>(null);
  const [notRecommended, setNotRecommended] = useState<{ title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      height: Number(height),
      weight: Number(currentWeight),
      desiredWeight: Number(desiredWeight),
      age: Number(age),
      bloodType: Number(bloodType),
    };

    try {
      const publicData = await getPublicCalories(requestData);
      setDailyKcal(publicData.dailyKcal);
      setNotRecommended(publicData.notRecommended);
      setIsModalOpen(true);
    } catch (error) {
      console.error("❌ Failed to fetch calorie data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 flex flex-col gap-10 pt-20">
      <h2 className="text-2xl font-bold">
        Calculate your daily calorie intake right now
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-6">
          <div className="flex flex-col gap-5">
            <Input
              placeholder="Height *"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <Input
              placeholder="Age *"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Input
              placeholder="Current weight *"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-5">
            <Input
              placeholder="Desired weight *"
              value={desiredWeight}
              onChange={(e) => setDesiredWeight(e.target.value)}
            />
            <Input
              placeholder="Blood Type"
              value={bloodType}
              readOnly
              className="cursor-not-allowed"
            />
            <RadioGroup
              name="bloodType"
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
              ]}
              selectedValue={bloodType}
              onChange={setBloodType}
            />
            {/* <Button type="submit" disabled={loading}>
              {loading ? "Calculating..." : "Calculate"}
            </Button> */}
            <Button
              type="submit"
              color="primary"
              variant="filled"
              size="md"
              disabled={loading}
            >
              Start losing weight
            </Button>
          </div>
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center flex flex-col gap-4 items-center">
          <h2 className="font-bold text-lg">Your recommended daily intake</h2>
          <p className="text-4xl font-bold mt-2">
            {dailyKcal} <span className="text-sm">kcal</span>
          </p>

          <div className="border-b w-52 mx-auto my-4"></div>

          <h3 className="text-md font-semibold text-left">
            Foods you should not eat
          </h3>
          {notRecommended.length > 0 ? (
            <ol className="text-gray-500 text-sm mt-2 flex flex-col items-start">
              {notRecommended.map((food, index) => (
                <li key={index}>{food.title}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 text-sm mt-2">
              Your diet restrictions will be displayed here.
            </p>
          )}

          <div className="mt-6 mb-4">
            <Button
              color="primary"
              variant="filled"
              size="md"
              onClick={() => router.push("/login")}
            >
              Start losing weight
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
