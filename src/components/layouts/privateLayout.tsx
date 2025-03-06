"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { NavbarPrivate } from "../organism/navBar-private";
import { useAuth } from "@/services/auth/useAuth";
import { CalorieIntakeFormPrivate } from "../organism/calculate-calorie-private";
import { API_BASE_URL } from "@/utils/config";

export function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notRecommended, setNotRecommended] = useState<
    { title: string }[] | null
  >(null);

  const hasFetched = useRef(false);

  const storedNotRecommended = useMemo(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("notRecommendedFoods");
      return savedData ? JSON.parse(savedData) : null;
    }
    return null;
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
        setNotRecommended(data.notRecommended || []);

        localStorage.setItem(
          "notRecommendedFoods",
          JSON.stringify(data.notRecommended || [])
        );
      } catch (error) {
        console.error("❌ Error fetching today’s data:", error);
      }
    };

    if (user && !notRecommended && storedNotRecommended) {
      setNotRecommended(storedNotRecommended);
    } else if (user && !hasFetched.current) {
      hasFetched.current = true;
      fetchTodayData();
    }
  }, [user, notRecommended, storedNotRecommended]);

  return (
    <div className="bg-white flex flex-col relative">
      <div className="fixed top-0 md:top-[-10px] left-0 w-full z-50">
        <NavbarPrivate />
      </div>

      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-start px-6">
          <CalorieIntakeFormPrivate
            onUpdateNotRecommended={(foods) => {
              setNotRecommended(foods);
              localStorage.setItem(
                "notRecommendedFoods",
                JSON.stringify(foods)
              );
            }}
          />
          {children}
        </div>

        <div className="w-full lg:w-2/5 bg-gray-100 p-8 flex flex-col justify-center items-center relative h-auto lg:h-screen">
          <h3 className="text-gray-700 font-semibold text-md">
            Food not recommended
          </h3>
          {notRecommended && notRecommended.length > 0 ? (
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

          <Image
            src="/images/leaves-2.png"
            alt="Leaves"
            width={540}
            height={180}
            className="absolute right-0 lg:t-20"
          />
        </div>
      </div>
    </div>
  );
}
