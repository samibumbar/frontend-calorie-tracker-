"use client";

import { useEffect, useState } from "react";
import { getSummary } from "@/services/api";
import { useAuth } from "@/services/auth/useAuth";

interface SummaryData {
  dailyKcal?: number;
  totalCaloriesConsumed?: number;
  remainingCalories?: number;
  percentageOfNormal?: number;
}

interface SummaryProps {
  refreshTrigger?: boolean;
}

export function Summary({ refreshTrigger }: SummaryProps) {
  const { user } = useAuth();
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchSummary = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const token = localStorage.getItem("token") || "";
        const data = await getSummary(today, token);

        const percentageOfNormal =
          data.totalCaloriesConsumed && data.dailyKcal
            ? Math.round((data.totalCaloriesConsumed / data.dailyKcal) * 100)
            : 0;

        setSummary({ ...data, percentageOfNormal });
      } catch {
        setError("Failed to load summary data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [user, refreshTrigger]);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const todayFormatted = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-gray-500 mb-4">
        Summary for {todayFormatted}
      </h2>
      <div className="grid grid-cols-2 text-gray-500 text-sm">
        <p className="text-left">Left</p>
        <p className="text-right font-semibold">
          {summary?.remainingCalories ?? 0} kcal
        </p>

        <p className="text-left">Consumed</p>
        <p className="text-right font-semibold">
          {summary?.totalCaloriesConsumed ?? 0} kcal
        </p>

        <p className="text-left">Daily rate</p>
        <p className="text-right font-semibold">
          {summary?.dailyKcal ?? 0} kcal
        </p>

        <p className="text-left">n% of normal</p>
        <p className="text-right font-semibold">
          {summary?.percentageOfNormal ?? 0} %
        </p>
      </div>
    </div>
  );
}
