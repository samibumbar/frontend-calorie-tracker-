"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { NavbarPrivate } from "../organism";
import { useAuth } from "@/services/auth/useAuth";
import { CalorieIntakeFormPrivate } from "../organism";
import { API_BASE_URL } from "@/utils/config";
import DiaryPage from "../organism/diary";
import { Summary } from "../organism";

export function PrivateLayout() {
  const { user } = useAuth();
  const [activeComponent, setActiveComponent] = useState("calculator");
  const [notRecommended, setNotRecommended] = useState<{ title: string }[]>([]);
  const [refreshSummary, setRefreshSummary] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFoods = localStorage.getItem("notRecommendedFoods");
      if (savedFoods) {
        setNotRecommended(JSON.parse(savedFoods));
      }
    }
  }, []);

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        const response = await fetch(`${API_BASE_URL}/api/days/${today}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch today's data");

        const data = await response.json();

        if (data.notRecommended && data.notRecommended.length > 0) {
          setNotRecommended(data.notRecommended);

          localStorage.setItem(
            "notRecommendedFoods",
            JSON.stringify(data.notRecommended)
          );
        }
      } catch (error) {
        console.error(" Error fetching today’s data:", error);
      }
    };

    if (user && !hasFetched.current) {
      hasFetched.current = true;
      fetchTodayData();
    }
  }, [user]);

  const handleUpdateNotRecommended = (foods: { title: string }[]) => {
    setNotRecommended(foods);
    localStorage.setItem("notRecommendedFoods", JSON.stringify(foods));
    setRefreshSummary((prev) => !prev);
  };

  return (
    <div className="bg-white flex flex-col relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavbarPrivate
          setActiveComponent={setActiveComponent}
          activeComponent={activeComponent}
        />
      </div>

      <div>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 flex flex-col justify-center items-start mt-10">
            {activeComponent === "calculator" ? (
              <CalorieIntakeFormPrivate
                onUpdateNotRecommended={handleUpdateNotRecommended}
              />
            ) : (
              <div className="mt-4">
                <DiaryPage />
              </div>
            )}
          </div>

          <div className="w-full lg:w-2/5 h-full bg-gray-100 flex flex-col justify-center items-center relative lg:h-screen">
            <div className="flex flex-col items-center justify-center p-6 gap-4">
              <Summary refreshTrigger={refreshSummary} />
              <div>
                <h3 className="text-gray-700 font-semibold text-md">
                  Food not recommended
                </h3>
                {notRecommended.length > 0 ? (
                  <ul className="text-gray-500 text-sm mt-2">
                    {notRecommended.map((food, index) => (
                      <li key={index}>{food.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm mt-2">
                    Your diet will be displayed here
                  </p>
                )}
              </div>
            </div>

            <Image
              src="/images/leaves-2.png"
              alt="Leaves"
              width={540}
              height={180}
              className="absolute right-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
