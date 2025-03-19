import { useState, useCallback, useMemo } from "react";

interface FormData {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  age: string;
  bloodType: string;
}

interface CalorieData {
  dailyKcal: number;
  notRecommended: { title: string }[];
}

type SubmitFn = (data: {
  height: number;
  currentWeight: number;
  desiredWeight: number;
  age: number;
  bloodType: number;
}) => Promise<CalorieData>;

export function useCalorieForm(submitFn: SubmitFn) {
  const [formData, setFormData] = useState<FormData>({
    height: "",
    currentWeight: "",
    desiredWeight: "",
    age: "",
    bloodType: "1",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dailyKcal, setDailyKcal] = useState<number | null>(null);
  const [notRecommended, setNotRecommended] = useState<{ title: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const requestData = useMemo(
    () => ({
      height: parseFloat(formData.height) || 0,
      currentWeight: parseFloat(formData.currentWeight) || 0,
      desiredWeight: parseFloat(formData.desiredWeight) || 0,
      age: parseInt(formData.age, 10) || 0,
      bloodType: parseInt(formData.bloodType, 10) || 1,
    }),
    [formData]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const data = await submitFn(requestData);
        setDailyKcal(data.dailyKcal);
        setNotRecommended(data.notRecommended);
        setIsModalOpen(true);
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    },
    [submitFn, requestData]
  );

  return {
    formData,
    isModalOpen,
    dailyKcal,
    notRecommended,
    loading,
    setIsModalOpen,
    handleChange,
    handleSubmit,
  };
}
