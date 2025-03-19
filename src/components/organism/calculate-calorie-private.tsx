"use client";

import { useState, useMemo } from "react";
import { Button, Input, RadioGroup } from "../atoms";
import { Modal } from "./modal";
import { saveDailyCalories } from "@/services/api";
import { toast } from "react-toastify";

export function CalorieIntakeFormPrivate({
  onUpdateNotRecommended,
}: {
  onUpdateNotRecommended: (foods: { title: string }[]) => void;
}) {
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [desiredWeight, setDesiredWeight] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("1");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyKcal, setDailyKcal] = useState<number | null>(null);
  const [notRecommended, setNotRecommended] = useState<{ title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const requestData = useMemo(
    () => ({
      height: Number(height),
      weight: Number(currentWeight),
      desiredWeight: Number(desiredWeight),
      age: Number(age),
      bloodType: Number(bloodType),
    }),
    [height, currentWeight, desiredWeight, age, bloodType]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token") || "";
      const data = await saveDailyCalories(requestData, token);
      setDailyKcal(data.dailyKcal);
      setNotRecommended(data.notRecommended);
      setIsModalOpen(true);

      localStorage.setItem(
        "notRecommendedFoods",
        JSON.stringify(data.notRecommended || [])
      );

      onUpdateNotRecommended(data.notRecommended);

      toast.success("Daily calorie intake saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save daily calories!");
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
        <div className="flex gap-6 flex-col md:flex-row">
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
            <Button type="submit" disabled={loading}>
              {loading ? "Calculating..." : "Start losing weight"}
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
              onClick={() => setIsModalOpen(false)}
            >
              Start losing weight
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
